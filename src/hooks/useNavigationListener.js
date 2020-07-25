import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const useNavigationListener = (type, callback) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener(type, () => {
      if (typeof callback === 'function') {
        callback();
      }
    });

    return unsubscribe;
  }, [navigation, type, callback]);
};

export default useNavigationListener;
