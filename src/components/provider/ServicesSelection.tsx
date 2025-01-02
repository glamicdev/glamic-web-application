import  { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch } from 'redux';
import type { ServiceCategoriesActionTypes } from '../../ducks/serviceCategories/types';
import { Heading, Text } from '../../ui/Typography';
import { Button } from '../../ui/Button';
import { Loader } from 'lucide-react';
import { staggerChildren, scaleIn } from '../../ui/animations';
import { Layout } from '../../ui/Layout';
import { saveServices } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import FlatListApi from '../../components/common/FlatListApi';
import { getServiceCategories } from '../../ducks/serviceCategories/selectors';
import { requestServiceCategories, serviceCategoriesSuccess } from '../../ducks/serviceCategories/actions';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { ServiceCategory } from '../../ducks/serviceCategories/types';

interface ServiceCardProps {
  iconUrl: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

function ServiceCard({ iconUrl, name, selected, onClick }: ServiceCardProps) {
  return (
    <motion.button
      {...scaleIn}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all backdrop-blur-sm ${
        selected
          ? 'bg-white/10 dark:bg-white/5 ring-2 ring-primary-gold shadow-lg'
          : 'bg-white/80 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10'
      }`}
    >
      <img 
        src={iconUrl} 
        alt={name}
        className={`w-10 h-10 mb-2 object-contain ${
          selected ? 'filter-gold' : 'filter-gray'
        }`}
      />
      <Text className={`text-sm font-medium ${
        selected 
          ? 'text-primary-gold dark:text-primary-gold' 
          : 'text-gray-600 dark:text-gray-300'
      }`}>
        {name}
      </Text>
    </motion.button>
  );
}

const SERVICE_CATEGORIES_REQUEST_ID = 'service_categories';

export default function ServicesSelection() {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch<Dispatch<ServiceCategoriesActionTypes>>();
  const categories = useSelector(getServiceCategories);
  const requestFlags = useSelector(getRequestFlag(SERVICE_CATEGORIES_REQUEST_ID));

  const toggleService = (category: ServiceCategory) => {
    const updatedCategories = categories.map(cat => 
      cat.id === category.id ? { ...cat, selected: !cat.selected } : cat
    );
    dispatch(serviceCategoriesSuccess(updatedCategories));
  };

  const handleContinue = async () => {
    const selectedServices = categories.filter(category => category.selected);
    console.log('Selected services:', selectedServices);
    
    setLoading(true);
    setError(null);

    try {
      const response = await saveServices(selectedServices);
      console.log('API Response:', response);

      if (response.success) {
        navigate('/location');
      } else {
        setError(response.error || 'Failed to save services');
      }
    } catch (err) {
      console.error('Error saving services:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const hasSelectedServices = categories.some(category => category.selected);

  const renderServiceCard = ({ item: category }: { item: ServiceCategory; index: number }) => (
    <ServiceCard
      key={category.id}
      iconUrl={category.icon}
      name={category.title}
      selected={category.selected || false}
      onClick={() => toggleService(category)}
    />
  );

  return (
    <Layout maxWidth="xl">
      <Heading className="text-center mb-4 dark:text-white">
        {translations.services?.title ?? 'Select Your Services'}
      </Heading>
      
      <Text className="text-center mb-16 max-w-2xl mx-auto dark:text-gray-300">
        {translations.services?.subtitle ?? 'Choose the services you want to offer'}
      </Text>
      
      <motion.div {...staggerChildren} className="mb-16">
        <FlatListApi
          requestAction={requestServiceCategories}
          requestFlags={requestFlags}
          data={categories}
          identifier={SERVICE_CATEGORIES_REQUEST_ID}
          renderItem={renderServiceCard}
          numColumns={4}
          listStyle={{ overflowY: 'hidden' }}
          contentContainerStyle={{ gap: '1.5rem' }}
          emptyView={() => (
            <div className="col-span-full text-center text-gray-500">
              No service categories available
            </div>
          )}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hasSelectedServices ? 1 : 0, y: hasSelectedServices ? 0 : 20 }}
        className="space-y-4"
      >
        <Button
          variant="primary"
          onClick={handleContinue}
          disabled={loading || !hasSelectedServices}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              {translations.services?.saving ?? 'Saving...'}
            </span>
          ) : (
            translations.services?.continue ?? 'Continue'
          )}
        </Button>
        
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
      </motion.div>
    </Layout>
  );
}
