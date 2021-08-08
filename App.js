import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [loanAmount, setLoanAmount] = React.useState(''); //Init Empty
  const [loanMonthDuration, setLoanMonthDuration] = React.useState('');
  const [monthlyInterestRate, setMonthlyInterestRate] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  function showFormattedLoanAmount(monthlyPayment) {
    let number = parseInt(monthlyPayment) || 0;
    return number.toFixed(2).toLocaleString("en-US");
  }

  function monthlyPaymentCalculation(loanAmount, interest, loanMonthDuration) {
    let answer = loanAmount *
      (interest / (1 - Math.pow((1 + interest), (-loanMonthDuration))));
    let formattedAnswer = showFormattedLoanAmount(answer);
    setAnswer(formattedAnswer);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auto Loan Calculator</Text>
      <View style={{flexDirection:'row', backgroundColor:'pink'}}>
         <Text style={{padding:20, backgroundColor:'green'}}>Loan Amount</Text>
          <TextInput 
          style={styles.input}
          onChangeText={loanAmount => setLoanAmount(loanAmount)}
          placeholder="Enter value"
          keyboardType="numeric"
        />
      </View>
      <View style={{flexDirection:'row', backgroundColor:'red'}}>
         <Text style={{padding:20, backgroundColor:'green'}}>Loan Month Duration</Text>
          <TextInput 
          style={styles.input}
          onChangeText={loanMonthDuration => setLoanMonthDuration(loanMonthDuration)}
          placeholder="Enter value"
          keyboardType="numeric"
        />
      </View>
      <View style={{flexDirection:'row', backgroundColor:'lightblue'}}>
         <Text style={{ padding:20, backgroundColor:'green'}}>Monthly Interest Rate</Text>
          <TextInput 
          style={styles.input}
          onChangeText={monthlyInterestRate=> setMonthlyInterestRate(monthlyInterestRate)}
          placeholder="Enter value"
          keyboardType="numeric"
        />
      </View>
      <View style={{backgroundColor:'lightblue'}}>
        <Button title = "Calculate" onPress={()=> monthlyPaymentCalculation(loanAmount, monthlyInterestRate, loanMonthDuration)} />
      </View>
      <View>
      </View>
      {
        answer ? 
        <Text style={{backgroundColor:'red'}}> {answer}</Text> : 
        <Text style={{backgroundColor:'red'}}> Please Enter a Value</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
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
