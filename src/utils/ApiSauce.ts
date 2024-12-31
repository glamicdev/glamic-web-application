import _ from 'lodash';
import {
  BASE_URL,
  REQUEST_TYPE,
  ApiEndpoint
} from '../config/WebService';
import ToastHandler from '../services/toastHandler';
import { Language } from '../utils/language';

// Import translations directly since we can't use hooks in non-React components
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import ru from '../locales/ru.json';

interface ApiResponse {
  status: number;
  data?: any;
  problem?: string;
}

interface ApiError {
  message: string;
  statusCode: number;
  data?: any;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Translations = typeof en;
const translations: Record<Language, DeepPartial<Translations>> = { en, tr, es, fr, ru };

function getTranslation(key: string): string {
  const language = (localStorage.getItem('language') as Language) || 'en';
  const keys = key.split('.');
  let value: any = translations[language];
  let fallback: any = translations.en;

  for (const k of keys) {
    value = value?.[k];
    fallback = fallback?.[k];
  }

  return value || fallback || key;
}

function serialize(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

function getHeaders(): { Authorization?: string } {
  const defaultHeader: { Authorization?: string } = {};
  // TODO: Implement token retrieval from your auth system
  const token = localStorage.getItem('token');
  if (token) {
    defaultHeader.Authorization = `Bearer ${token}`;
  }
  return defaultHeader;
}

export async function callRequest(
  url: ApiEndpoint,
  payload: Record<string, any> | FormData = {},
  headers: Record<string, string> = {},
  parameter = ''
): Promise<any> {
  const { type, access_token_required } = url;
  const isFileUpload = payload instanceof FormData;
  const route = parameter ? `${url.route}?${parameter}` : url.route;
  let endPoint = `${BASE_URL}${route}`;

  if (access_token_required) {
    headers = { ...getHeaders(), ...headers };
  }

  if (type === REQUEST_TYPE.GET && !_.isEmpty(payload) && !(payload instanceof FormData)) {
    const queryParameters = serialize(payload as Record<string, any>);
    if (queryParameters) {
      endPoint = `${endPoint}?${queryParameters}`;
    }
  }

  return new Promise((resolve, reject) => {
    let customOptions: RequestInit = {
      method: type,
      headers: {
        ...(isFileUpload
          ? { accept: 'application/json, text/plain, /' }
          : {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
        ...headers,
      },
    };

    if (type !== REQUEST_TYPE.GET) {
      customOptions.body = isFileUpload
        ? payload
        : JSON.stringify(payload);
    }

    fetch(endPoint, customOptions)
      .then((responseApi) => {
        handleResponse(responseApi, resolve, reject, endPoint);
      })
      .catch((error) => {
        handleResponse(error, resolve, reject, endPoint);
      });
  });
}

export async function handleResponse(
  responseApi: Response,
  resolve: (value: any) => void,
  reject: (reason: ApiError) => void,
  endPoint: string
): Promise<void> {
  let response: ApiResponse = { status: responseApi.status };

  try {
    response.data = await responseApi.json();
    console.log('API Response:', response, endPoint);

    const isClientError = response.status === 400;
    const isKickUser = response.status === 403 || response.status === 401;
    const isResponseValid = response.data && (response.status === 200 || response.status === 201);

    if (isResponseValid) {
      resolve(response.data);
    } else if (isKickUser) {
      reject({
        message: getTranslation('api.errors.kicked'),
        statusCode: 403,
      });
      
      setTimeout(() => {
        ToastHandler.showToast(getTranslation('api.errors.unauthorized'));
      }, 200);
    } else if (isClientError) {
      const message = response.data?.message || response.data?.msg || getTranslation('api.errors.client');
      reject({
        message,
        statusCode: response.status,
        data: response.data,
      });
    } else {
      const message = response.data?.message || response.data?.msg || getTranslation('api.errors.general');
      reject({
        message,
        statusCode: response.status,
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    reject({
      message: getTranslation('api.errors.general'),
      statusCode: response.status,
    });
  }
}
