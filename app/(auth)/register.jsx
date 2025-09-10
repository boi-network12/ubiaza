import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Logo from '../../assets/images/logo.png';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

/*
  Rewritten Register screen. Key goals:
  - Prevent keyboard dismiss after typing one character (do not call step components as functions)
  - Separate step components and memoize them so they don't unmount unnecessarily
  - Centralized form hook for state & validation
  - Clear, readable, and maintainable structure
*/

/* ---------- Helper hook: useRegisterForm ---------- */
function useRegisterForm(initial = {}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    nin: '',
    bvn: '',
    ninImage: null,
    ...initial,
  });

  const update = useCallback((key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      nin: '',
      bvn: '',
      ninImage: null,
      ...initial,
    });
  }, [initial]);

  return { form, update, reset, setForm };
}

/* ---------- Password validations ---------- */
const getPasswordValidations = (password, confirmPassword) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
  match: password.length > 0 && password === confirmPassword,
});

/* ---------- Step components (defined outside main component) ---------- */
const StepOne = React.memo(function StepOne({ form, update, errors, theme, refs }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.FormHeaderText, { color: theme.text }]}>Create your account</Text>
      <InputField
        label="First Name"
        placeholder="John"
        value={form.firstName}
        onChangeText={(v) => update('firstName', v)}
        error={errors.firstName}
        inputRef={refs.firstNameRef}
        onSubmitEditing={() => refs.lastNameRef.current?.focus()}
        returnKeyType="next"
        accessibilityLabel="First Name"
        theme={theme}
      />
      <InputField
        label="Last Name"
        placeholder="Doe"
        value={form.lastName}
        onChangeText={(v) => update('lastName', v)}
        error={errors.lastName}
        inputRef={refs.lastNameRef}
        onSubmitEditing={() => refs.emailRef.current?.focus()}
        returnKeyType="next"
        accessibilityLabel="Last Name"
        theme={theme}
      />
      <InputField
        label="Email Address"
        placeholder="example@gmail.com"
        value={form.email}
        onChangeText={(v) => update('email', v)}
        error={errors.email}
        inputRef={refs.emailRef}
        onSubmitEditing={() => refs.phoneRef.current?.focus()}
        returnKeyType="next"
        keyboardType="email-address"
        accessibilityLabel="Email Address"
        theme={theme}
      />
      <InputField
        label="Phone"
        placeholder="+234 801 000 0000"
        value={form.phone}
        onChangeText={(v) => update('phone', v)}
        error={errors.phone}
        inputRef={refs.phoneRef}
        keyboardType="phone-pad"
        accessibilityLabel="Phone Number"
        theme={theme}
      />
    </View>
  );
});

const StepTwo = React.memo(function StepTwo({ form, update, errors, theme, refs }) {
  const validations = getPasswordValidations(form.password, form.confirmPassword);
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.FormHeaderText, { color: theme.text }]}>Set a secure password</Text>
      <InputField
        label="Password"
        placeholder="Password"
        value={form.password}
        onChangeText={(v) => update('password', v)}
        error={errors.password}
        inputRef={refs.passwordRef}
        onSubmitEditing={() => refs.confirmPasswordRef.current?.focus()}
        returnKeyType="next"
        secureTextEntry
        accessibilityLabel="Password"
        theme={theme}
      />
      <InputField
        label="Confirm password"
        placeholder="Confirm password"
        value={form.confirmPassword}
        onChangeText={(v) => update('confirmPassword', v)}
        error={errors.confirmPassword}
        inputRef={refs.confirmPasswordRef}
        secureTextEntry
        accessibilityLabel="Confirm Password"
        theme={theme}
      />
      <View style={{ marginTop: hp(1) }}>
        {[
          { ok: validations.length, text: 'At least 8 characters' },
          { ok: validations.uppercase, text: 'At least one uppercase letter' },
          { ok: validations.lowercase, text: 'At least one lowercase letter' },
          { ok: validations.number, text: 'At least one number' },
          { ok: validations.special, text: 'At least one special character' },
          { ok: validations.match, text: 'Passwords must match' },
        ].map(({ ok, text }, i) => (
          <View key={i} style={styles.checkRow}>
            <Text style={{ fontSize: hp(1.6) }}>{ok ? '✅' : '⭕️'}</Text>
            <Text style={[styles.checkText, { color: theme.subText }]}>{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});

const StepThree = React.memo(function StepThree({ form, update, errors, theme, refs, onPickImage, onTakePhoto, onRemoveImage }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.FormHeaderText, { color: theme.text }]}>Verification</Text>
      <InputField
        label="NIN"
        placeholder="Enter NIN"
        value={form.nin}
        onChangeText={(v) => update('nin', v)}
        error={errors.nin}
        inputRef={refs.ninRef}
        onSubmitEditing={() => refs.bvnRef.current?.focus()}
        returnKeyType="next"
        keyboardType="number-pad"
        accessibilityLabel="NIN"
        theme={theme}
      />
      <InputField
        label="BVN"
        placeholder="Enter BVN"
        value={form.bvn}
        onChangeText={(v) => update('bvn', v)}
        error={errors.bvn}
        inputRef={refs.bvnRef}
        keyboardType="number-pad"
        accessibilityLabel="BVN"
        theme={theme}
      />
      <View style={{ marginTop: hp(1.5) }}>
        <Text style={[styles.label, { color: theme.subText }]}>Upload / Snap NIN card</Text>
        <View style={{ flexDirection: 'row', gap: hp(1), marginTop: hp(1) }}>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: theme.card }]} onPress={onPickImage}>
            <Text style={{ color: theme.text }}>Choose from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBtn, { backgroundColor: theme.card }]} onPress={onTakePhoto}>
            <Text style={{ color: theme.text }}>Take a photo</Text>
          </TouchableOpacity>
        </View>
        {form.ninImage ? (
          <View style={{ marginTop: hp(2), alignItems: 'center' }}>
            <Image source={{ uri: form.ninImage.uri }} style={{ width: wp(50), height: hp(20), borderRadius: 8 }} />
            <TouchableOpacity onPress={onRemoveImage} style={{ marginTop: hp(1) }}>
              <Text style={{ color: theme.primary }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : errors.ninImage ? (
          <Text style={{ color: 'red', marginTop: hp(1), textAlign: 'center' }}>Please upload an NIN image</Text>
        ) : null}
      </View>
    </View>
  );
});

const StepFour = React.memo(function StepFour({ form, theme }) {
  return (
    <View style={styles.stepContainer}>
      <Text style={[styles.FormHeaderText, { color: theme.text }]}>Review & Submit</Text>
      <View style={[styles.reviewCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {[
          { label: 'Name', value: `${form.firstName} ${form.lastName}` },
          { label: 'Email', value: form.email },
          { label: 'Phone', value: form.phone },
          { label: 'NIN', value: form.nin },
          { label: 'BVN', value: form.bvn },
        ].map(({ label, value }, i) => (
          <View key={i}>
            <Text style={[styles.reviewLabel, { color: theme.subText }]}>{label}</Text>
            <Text style={[styles.reviewValue, { color: theme.text }]}>{value}</Text>
          </View>
        ))}
        {form.ninImage && (
          <View style={{ marginTop: hp(2), alignItems: 'center' }}>
            <Image source={{ uri: form.ninImage.uri }} style={{ width: wp(55), height: hp(22), borderRadius: 8 }} />
          </View>
        )}
      </View>
    </View>
  );
});

/* ---------- InputField component (memoized) ---------- */
const InputField = React.memo(function InputField({ label, placeholder, value, onChangeText, error, inputRef, keyboardType, secureTextEntry, onSubmitEditing, returnKeyType, accessibilityLabel, theme }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.InputContainer}>
      <Text style={[styles.label, { color: theme.subText }]}>{label}</Text>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, {
          borderColor: error ? 'red' : focused ? theme.primary : theme.border,
          color: theme.text,
        }]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        accessibilityLabel={accessibilityLabel}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
      />
    </View>
  );
});

/* ---------- Main Register component ---------- */
export default function Register() {
  const { theme } = useTheme();
  const { form, update } = useRegisterForm();
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  // Animated value (kept stable)
  const anim = useRef(new Animated.Value(0)).current;

  // Refs for inputs (stable refs)
  const refs = useMemo(() => ({
    firstNameRef: React.createRef(),
    lastNameRef: React.createRef(),
    emailRef: React.createRef(),
    phoneRef: React.createRef(),
    passwordRef: React.createRef(),
    confirmPasswordRef: React.createRef(),
    ninRef: React.createRef(),
    bvnRef: React.createRef(),
  }), []);

  // Request permissions once
  useEffect(() => {
    (async () => {
      try {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!cameraStatus.granted || !mediaStatus.granted) {
          Alert.alert('Permission Denied', 'Camera and media library permissions are required.');
        }
      } catch (e) {
        console.warn('Permission error', e);
      }
    })();
  }, []);

  // Keyboard debug (optional)
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => console.log('Keyboard shown'));
    const hide = Keyboard.addListener('keyboardDidHide', () => console.log('Keyboard hidden'));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  // Animation function
  const goToStep = useCallback((index) => {
    Animated.timing(anim, {
      toValue: index,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    setCurrentStep(index);
  }, [anim]);

  // Image pickers
  const pickImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        update('ninImage', { uri: result.assets[0].uri });
      }
    } catch (e) {
      console.error('Image picker error:', e);
      Alert.alert('Error', 'Failed to pick image');
    }
  }, [update]);

  const takePhoto = useCallback(async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });
      if (!result.canceled && result.assets?.[0]?.uri) {
        update('ninImage', { uri: result.assets[0].uri });
      }
    } catch (e) {
      console.error('Camera error:', e);
      Alert.alert('Error', 'Failed to capture photo');
    }
  }, [update]);

  const removeImage = useCallback(() => update('ninImage', null), [update]);

  // Validation logic (returns bool)
  const validateStep = useCallback((step = currentStep) => {
    const newErrors = {};
    let isValid = true;
    const validations = getPasswordValidations(form.password, form.confirmPassword);

    if (step === 0) {
      if (!form.firstName) { newErrors.firstName = true; isValid = false; }
      if (!form.lastName) { newErrors.lastName = true; isValid = false; }
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { newErrors.email = true; isValid = false; }
      if (!form.phone) { newErrors.phone = true; isValid = false; }
    } else if (step === 1) {
      if (!validations.length || !validations.uppercase || !validations.lowercase || !validations.number || !validations.special || !validations.match) {
        newErrors.password = true;
        newErrors.confirmPassword = true;
        isValid = false;
      }
    } else if (step === 2) {
      if (!form.nin) { newErrors.nin = true; isValid = false; }
      if (!form.bvn) { newErrors.bvn = true; isValid = false; }
      if (!form.ninImage) { newErrors.ninImage = true; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  }, [form, currentStep]);

  // isStepValid used to enable/disable next button without showing errors
  const isStepValid = useCallback(() => {
    const validations = getPasswordValidations(form.password, form.confirmPassword);
    if (currentStep === 0) {
      return form.firstName && form.lastName && form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.phone;
    } else if (currentStep === 1) {
      return validations.length && validations.uppercase && validations.lowercase && validations.number && validations.special && validations.match;
    } else if (currentStep === 2) {
      return form.nin && form.bvn && form.ninImage;
    }
    return true;
  }, [form, currentStep]);

  // Handlers
  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) {
      Alert.alert('Validation Error', 'Please complete all required fields correctly.');
      return;
    }
    if (currentStep < 3) goToStep(currentStep + 1);
  }, [currentStep, validateStep, goToStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) goToStep(currentStep - 1);
    else router.back();
  }, [currentStep, goToStep]);

  const handleSubmit = useCallback(async () => {
    if (!validateStep(3)) {
      Alert.alert('Validation Error', 'Please review and complete all fields.');
      return;
    }

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'ninImage' && value?.uri) {
        const uriParts = value.uri.split('.');
        const ext = uriParts[uriParts.length - 1];
        // Ensure ext is reasonable
        const mime = `image/${ext.includes('jpg') || ext.includes('jpeg') ? 'jpeg' : ext}`;
        body.append('ninImage', {
          uri: value.uri,
          name: `nin-card.${ext}`,
          type: mime,
        });
      } else if (key !== 'ninImage') {
        body.append(key, value);
      }
    });

    try {
      router.replace("/dashboard")
    } catch (e) {
      console.error('Submit error:', e);
      Alert.alert('Network Error', 'Unable to reach server');
    }
  }, [form, validateStep]);

  // Animated translateX
  const translateX = anim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, -width, -width * 2, -width * 3],
  });

  // Steps array (render components as JSX elements so React can preserve state between renders)
  const steps = useMemo(() => ([
    <StepOne key="step1" form={form} update={update} errors={errors} theme={theme} refs={refs} />,
    <StepTwo key="step2" form={form} update={update} errors={errors} theme={theme} refs={refs} />,
    <StepThree key="step3" form={form} update={update} errors={errors} theme={theme} refs={refs} onPickImage={pickImage} onTakePhoto={takePhoto} onRemoveImage={removeImage} />,
    <StepFour key="step4" form={form} theme={theme} />,
  ]), [form, update, errors, theme, refs, pickImage, takePhoto, removeImage]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.header} onPress={handleBack} accessibilityLabel="Go back">
        <BlurView intensity={100} style={styles.BlurView}>
          <Entypo name="chevron-small-left" size={hp(3)} color={theme.textActive} />
        </BlurView>
      </TouchableOpacity>

      <View style={styles.FirstInnerView}>
        <Image source={Logo} style={{ width: wp(10), height: hp(5), resizeMode: 'cover' }} />
        <Text style={[styles.logoText, { color: theme.text }]}>ubiaza</Text>
      </View>

      <Text style={[styles.logoTextLarge, { color: theme.text }]}>Join Ubiaza Today</Text>
      <Text style={[styles.topSubText, { color: theme.subText }]}>Create your account to start sending money internationally with competitive rates and fast transfers.</Text>

      <View style={styles.stepWrap}>
        {["Info", "Security", "Verify", "Review"].map((label, i) => (
          <TouchableOpacity key={i} onPress={() => goToStep(i)} style={styles.stepItem} accessibilityLabel={`Step ${i + 1}: ${label}`}>
            <View style={[styles.stepCircle, { backgroundColor: i === currentStep ? theme.primary : theme.card, borderColor: i === currentStep ? theme.primary : theme.border }]}>
              <Text style={[styles.stepNumber, { color: i === currentStep ? theme.textActive : theme.text }]}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepLabel, { color: i === currentStep ? theme.textActive : theme.subText }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: hp(2), android: RNStatusBar.currentHeight + hp(4) })}
        style={{ flex: 1, width: '100%' }}
      >
        <View style={{ width: '100%', paddingHorizontal: hp(2) }}>
          <Animated.View style={{ flexDirection: 'row', width: width * 4, transform: [{ translateX }] }}>
            {steps.map((comp, i) => (
              <ScrollView
                key={i}
                contentContainerStyle={{ alignItems: 'center', paddingVertical: hp(2), width }}
                keyboardShouldPersistTaps="handled"
              >
                <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  {comp}
                </View>
              </ScrollView>
            ))}
          </Animated.View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.navBtn, { backgroundColor: theme.card }]} onPress={handleBack} accessibilityLabel="Back">
            <Text style={{ color: theme.text }}>Back</Text>
          </TouchableOpacity>

          {currentStep < 3 ? (
            <TouchableOpacity
              style={[styles.navBtnPrimary, { backgroundColor: isStepValid() ? theme.primary : theme.secondary }]}
              onPress={handleNext}
              disabled={!isStepValid()}
              accessibilityLabel="Next"
            >
              <Text style={{ color: theme.textActive }}>{currentStep === 2 ? 'Review' : 'Next'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.navBtnPrimary, { backgroundColor: theme.primary }]} onPress={handleSubmit} accessibilityLabel="Submit">
              <Text style={{ color: theme.textActive }}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------- Styles (kept similar to your original) ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: hp(2),
  },
  BlurView: {
    width: hp(4),
    height: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(1),
  },
  FirstInnerView: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(1.5),
    marginBottom: hp(1),
  },
  logoText: {
    fontSize: hp(3),
    fontWeight: '600',
  },
  logoTextLarge: {
    marginTop: hp(2),
    fontSize: hp(3.4),
    fontWeight: '700',
  },
  topSubText: {
    textAlign: 'center',
    marginVertical: hp(1.2),
    fontSize: hp(1.8),
    fontWeight: '400',
    maxWidth: wp(80),
  },
  stepWrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: hp(2),
    marginTop: hp(1),
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  stepNumber: {
    fontWeight: '700',
  },
  stepLabel: {
    marginTop: hp(0.6),
    fontSize: hp(1.4),
    fontWeight: '500',
  },
  card: {
    width: width - hp(4),
    padding: hp(2),
  },
  stepContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  FormHeaderText: {
    marginBottom: hp(1.4),
    fontSize: hp(2.2),
    fontWeight: '700',
  },
  InputContainer: {
    marginBottom: hp(1.2),
    width: '100%',
  },
  label: {
    fontWeight: '600',
    fontSize: hp(1.6),
  },
  input: {
    borderWidth: hp(0.15),
    height: hp(5.5),
    marginTop: hp(0.6),
    borderRadius: hp(0.8),
    paddingHorizontal: hp(2),
  },
  smallBtn: {
    paddingVertical: hp(1.2),
    paddingHorizontal: hp(2.2),
    borderRadius: hp(1),
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(1),
    marginBottom: hp(0.6),
  },
  checkText: {
    marginLeft: hp(0.6),
    fontSize: hp(1.6),
  },
  reviewCard: {
    width: '100%',
    padding: hp(2),
    borderRadius: hp(1),
    borderWidth: 1,
  },
  reviewLabel: {
    fontSize: hp(1.4),
  },
  reviewValue: {
    fontSize: hp(1.8),
    fontWeight: '700',
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.5),
  },
  navBtn: {
    paddingVertical: hp(1.4),
    paddingHorizontal: hp(3),
    borderRadius: hp(1),
  },
  navBtnPrimary: {
    paddingVertical: hp(1.4),
    paddingHorizontal: hp(3.6),
    borderRadius: hp(1),
  },
});
