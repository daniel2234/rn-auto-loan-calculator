import React from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

//https://stackoverflow.com/questions/44357336/setting-up-a-table-layout-in-react-native
//https://stackoverflow.com/questions/52661362/textinput-full-view-in-row-direction


export default function App() {

  const [loanAmount, setLoanAmount] = React.useState(''); //Init Empty
  const [loanMonthDuration, setLoanMonthDuration] = React.useState('');
  const [monthlyInterestRate, setMonthlyInterestRate] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  function showFormattedLoanAmount(monthlyPayment) {
    let number = parseInt(monthlyPayment) || 0;
    return number.toFixed(2).toLocaleString("en-US");
  }

  function monthlyInterestRateConversion(interest) {
    return Number(interest) / 12;
  }
  
  function interestRateConversion(interest) {
    return Number(interest) / 100;
  }

  function monthlyPaymentCalculation(loanAmount, interest, loanMonthDuration) {
    interest = monthlyInterestRateConversion(interest);
    interest = interestRateConversion(interest);

    let answer = loanAmount *
      (interest / (1 - Math.pow((1 + interest), (-loanMonthDuration))));
    let formattedAnswer = showFormattedLoanAmount(answer);
    setAnswer(formattedAnswer);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auto Loan Calculator</Text>
      
      <View>

      </View>
      
      <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       >
         <ScrollView>
          <View style={styles.test}>
            <Text style={styles.testText}>Loan Amount</Text>
            <TextInput style={styles.input}
            onChangeText={loanAmount => setLoanAmount(loanAmount)}
            placeholder="Enter value"
            keyboardType="numeric"/>
          </View>
          <View style={styles.test}>
            <Text style={styles.testText}>Loan Month Duration</Text>
            <TextInput style={styles.input} 
              onChangeText={loanMonthDuration => setLoanMonthDuration(loanMonthDuration)}
              placeholder="Enter value"
              keyboardType="numeric"/>
          </View>
          <View style={styles.test}>
            <Text style={styles.testText}>Monthly Interest Rate</Text>
            <TextInput 
            style={styles.input}
            onChangeText={monthlyInterestRate=> setMonthlyInterestRate(monthlyInterestRate)}
            placeholder="Enter value"
            keyboardType="numeric"/>
          </View>
         </ScrollView>
         <View style={{backgroundColor:"lightblue"}}>
          <Button title = "Calculate" onPress={()=> monthlyPaymentCalculation(loanAmount, monthlyInterestRate, loanMonthDuration)} />
         </View>
         {
        answer ? 
        <View>
          <Text style={{backgroundColor:"lightgrey"}}> ${answer}</Text>
        </View> : null
      }  
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  testText: {
    padding:5,
    backgroundColor: "red",
    borderWidth:5,
    flexBasis:120,
    textAlign:"center",
  },
  test: {
    padding: 20,
    backgroundColor: 'lightpink',
    flexDirection:"row",
    borderWidth:2,
    borderColor:"grey"
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaeaea',
  },
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
    flex: 1,
  },
  title: {
    marginTop: 25,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#3275a8',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  }
});