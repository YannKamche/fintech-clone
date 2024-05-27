import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import React, { Fragment, useEffect, useState } from 'react'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';

//imports for the confirmation code field
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors';

// Cell count
const CELL_COUNT = 6;

const Page = () => {
    // We need to check  if we are signing in or verifying a signing up on that screen
    const { phone, signin } = useLocalSearchParams<{ phone: string, signin: string }>();

  //Create a code input
  const [code, setCode] = useState('');

  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  // Hook to update the code value
   const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
   const [props, getCellOnLayoutHandler] = useClearByFocusCell({
     value: code,
     setValue: setCode,
   });
  
  useEffect(() => {
    if (code.length === 6) //Every time code changes check the size of the verification code which is 6
      //Verify the code 
    // console.log(code)  
      signin ? verifySignIn() : verifyCode() 

    // verify the code
  }, [code]);

  const verifyCode = async () => {
    try {
      // Verifies only on the clerk side
      await signUp!.attemptPhoneNumberVerification({
        code,
      })
      //Ensure the user is activated afterwards
      // setActive can also be undefined
      await setActive!({
        session: signUp!.createdSessionId
      });
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message)
      }
    }
  };

  const verifySignIn = async () => {
    try {
      // Verifies only on the clerk side
      await signIn!.attemptFirstFactor({
        strategy: 'phone_code',
        code,
      });
      //Ensure the user is activated afterwards
      // setActive can also be undefined
      await setActive!({
        session: signIn!.createdSessionId,
      });
    } catch (err) {
      console.log("error", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };


  
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      {/* Code field for the UI */}
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}
            >
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: "center",
  },
});
export default Page