import {useAppSelector} from './store';
import {getUserState} from '@store';

export const useGetSupportUrls = () => {
  const {selectedLanguage} = useAppSelector(getUserState);

  let insuranceConditions;

  let insuranceTerms;

  switch (selectedLanguage) {
    case 'ru': {
      insuranceConditions =
        'https://citypay.kg/docs/insurance_conditions_ru.php';
      insuranceTerms = 'https://citypay.kg/docs/insurance_terms_ru.php';
      break;
    }

    case 'en': {
      insuranceConditions =
        'https://citypay.kg/docs/insurance_conditions_en.php';
      insuranceTerms = 'https://citypay.kg/docs/insurance_terms_en.php';
      break;
    }

    case 'kg': {
      insuranceConditions =
        'https://citypay.kg/docs/insurance_conditions_ky.php';
      insuranceTerms = 'https://citypay.kg/docs/insurance_terms_ky.php';
      break;
    }

    default: {
      insuranceConditions =
        'https://citypay.kg/docs/insurance_conditions_ru.php';
      insuranceTerms = 'https://citypay.kg/docs/insurance_terms_ru.php';
      break;
    }
  }
  return {
    insuranceConditions,
    insuranceTerms,
  };
};
