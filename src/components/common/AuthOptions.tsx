import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { PhoneInput } from '../../ui/PhoneInput';
import { Heading } from '../../ui/Typography';
import { Divider } from '../../ui/Divider';
import { fadeIn, staggerChildren } from '../../ui/animations';
import { useLanguage } from '../../context/LanguageContext';
import { signInWithGoogle, signInWithApple } from '../../services/auth';
import { validateEmail } from '../../utils/validation';
import GoogleIconSvg from '../svgs/GoogleIconSvg';
import { showErrorToast } from '../../services/toastHandler';
import { checkUserExists } from '../../ducks/auth/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Util from '../../utils/Util';

export default function AuthOptions() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email' | 'social'>('phone');
  const [loading, setLoading] = useState(false);
  const [phoneState, setPhoneState] = useState({
    value: '',
    isValid: false
  });
  const [emailValue, setEmailValue] = useState('');

  const handleContinue = async () => {

    const currentValue = authMethod === 'phone' ? phoneState.value : emailValue;
    
    if (authMethod === 'email') {
      if (!currentValue) {
        showErrorToast(translations.signup?.validation?.required || 'This field is required');
        return;
      }
      if (!validateEmail(currentValue)) {
        showErrorToast(translations.signup?.validation?.email || 'Please enter a valid email address');
        return;
      }
    } else {
      if (!phoneState.value) {
        showErrorToast(translations.signup?.validation?.required || 'This field is required');
        return;
      }
      if (!phoneState.isValid) {
        showErrorToast(translations.auth?.validation?.phone || 'Please enter a valid phone number');
        return;
      }
    }
    
    setLoading(true);

     
        dispatch(checkUserExists({payload:{
          mobile_number: authMethod === 'phone' ? phoneState.value : '',
          email: authMethod === 'email' ? currentValue : '',
          verify_email : authMethod === 'email',
          verify_phone: authMethod === 'phone',
          verify_social_login: authMethod === 'social',
        },
        callback:(data:any)=>{
          if(Util.isEmpty(data)){
            navigate(`/signup?method=${authMethod}`);
          }else{
            navigate('/verify')
          }
        }
       }
      ));
  };

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true);
    console.log(`Attempting ${provider} authentication`);

    try {
      const response = await (provider === 'google' 
        ? signInWithGoogle()
        : signInWithApple()
      );

      console.log(`${provider} auth response:`, response);

      if (response.success) {
        console.log('Social authentication successful, updating user data:', response.data?.user);
        dispatch({
          type: 'SET_USER_DATA',
          payload: { 
            authMethod: 'social',
            ...(response.data?.user || {})
          }
        });
        dispatch({ type: 'SET_STEP', payload: 2 });
      } else {
        console.error('Social authentication failed:', response.error);
        showErrorToast(response.error || translations.auth?.errors?.failed || 'Authentication failed');
      }
    } catch (err) {
      console.error('Social authentication error:', err);
      showErrorToast(translations.auth?.errors?.general || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMethod = () => {
    setAuthMethod(authMethod === 'phone' ? 'email' : 'phone');
    setEmailValue('');
    setPhoneState({ value: '', isValid: false });
  };

  return (
    <motion.div
      {...fadeIn}
      className="w-full max-w-md mx-auto space-y-6 p-8"
    >
      <Heading className="mb-8 text-center">
        {translations.auth?.title || 'Log in or Sign Up'}
      </Heading>
      
      <motion.div {...fadeIn} className="text-center mb-12">
        {translations.auth?.subtitle || 'Create an account or log in to manage your business'}
      </motion.div>
      
      <motion.div {...staggerChildren} className="space-y-4">
        <Button
          variant="outline"
          onClick={toggleAuthMethod}
          fullWidth
        >
          {authMethod === 'phone' 
            ? translations.auth?.continueWithEmail || 'Continue with email'
            : translations.auth?.continueWithPhone || 'Continue with phone'
          }
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={() => handleSocialAuth('google')}
          disabled={loading}
        >
         <GoogleIconSvg/>
          {translations.auth?.continueWithGoogle || 'Continue with Google'}
        </Button>
        
        <Button
          variant="outline"
          icon={Apple}
          fullWidth
          onClick={() => handleSocialAuth('apple')}
          disabled={loading}
        >
          {translations.auth?.continueWithApple || 'Continue with Apple'}
        </Button>
      </motion.div>
      
      <Divider text={translations.auth?.or || 'OR'} />
      
      <motion.div {...staggerChildren} className="space-y-4">
        {authMethod === 'phone' ? (
          <PhoneInput
            value={phoneState.value}
            onChange={(value) => {
              setPhoneState(prev => ({ ...prev, value }));
            }}
            onValidChange={(isValid) => {
              setPhoneState(prev => ({ ...prev, isValid }));
            }}
            disabled={loading}
          />
        ) : (
          <Input
            type="email"
            placeholder={translations.auth?.emailAddress || 'Email address'}
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            fullWidth
            disabled={loading}
          />
        )}
        <Button 
          variant="primary" 
          fullWidth
          onClick={handleContinue}
          // disabled={loading || (authMethod === 'phone' ? !phoneState.isValid : !emailValue.trim())}
        >
          {loading 
            ? translations.auth?.pleaseWait || 'Please wait...'
            : translations.auth?.continue || 'Continue'
          }
        </Button>
      </motion.div>
    </motion.div>
  );
}
