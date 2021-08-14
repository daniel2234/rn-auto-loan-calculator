import React from 'react';
import { Button, FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View, SafeAreaView } from 'react-native';

//https://stackoverflow.com/questions/44357336/setting-up-a-table-layout-in-react-native
//https://stackoverflow.com/questions/52661362/textinput-full-view-in-row-direction
//https://stackoverflow.com/questions/67623854/how-to-reference-button-in-card-component-in-react-native
// https://stackoverflow.com/questions/61152541/react-native-not-able-show-display-table-inside-a-flat-list
//https://codepen.io/joeymack47/pen/fHwvd?editors=1010
//https://codesandbox.io/s/z67yyo0wj3?file=/index.js
// in essence:
// 1. Initialise state with a boolean set to false
// 2. Render the component conditionally based on this boolean; so initially the component will now show up on the DOM
// 3. On some action (onClick), setState on the boolean to true
// 4. The component will re-render since the state changed and will now show the hidden component (since the boolean has been set to true)


// function calculateAmortizationPayments(inputData) {
//   return  [
//     // each array represents data for a year
//     { payments: 'val', yearlyTotal: 'val', principalPaid: 'val', interestPaid: 'val', balance: 'val' },
//     { payments: 'val', yearlyTotal: 'val', principalPaid: 'val', interestPaid: 'val', balance: 'val' },
//     { payments: 'val', yearlyTotal: 'val', principalPaid: 'val', interestPaid: 'val', balance: 'val' },
//     // ...
//   ]
// }

// class AmortizationPayments extends Component {
//   render() {
//     const paymentsByYear = calculateAmortizationPayments(inputData)

//     return (
//       <table>
//         <thead>
//           // ...
//         </thead>
//         <tbody>
//           {paymentsByYear.map(year => (
//             <tr key={...}>
//               <td>{year.payments}</td>
//               <td>{year.yearlyTotal}</td>
//               <td>{year.principalPaid}</td>
//               <td>{year.interestPaid}</td>
//               <td>{year.balance}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )
//   }
// }

//1
const Payment = ({month, beginning_balance, interest, principal, ending_balance }) => (
  <View style={{ flex: 1,borderWidth:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', padding:5, backgroundColor:'blue' }}>
    <Text style={{padding:5, backgroundColor:'red'}}>{month}</Text>
    <Text style={{padding:5, backgroundColor:'red'}}>${beginning_balance}</Text>
    <Text style={{padding:5, backgroundColor:'red'}}>${interest}</Text>
    <Text style={{padding:5, backgroundColor:'red'}}>${principal}</Text>
    <Text style={{padding:5, backgroundColor:'red'}}>${ending_balance}</Text>
  </View>
)

export default function App() {

  //2
  const renderItem = ({ item }) => (
    <Payment 
          month = {item.month}
          beginning_balance = {item.beginning_balance} 
          interest={item.interest} 
          principal={item.principal}
          ending_balance={item.ending_balance}
    />
  );

  const [loanAmount, setLoanAmount] = React.useState(''); //Init Empty
  const [loanMonthDuration, setLoanMonthDuration] = React.useState('');
  const [monthlyInterestRate, setMonthlyInterestRate] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [amortizationSchedule, setAmortizationSchedule] = React.useState([]);

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

  function calculateMonthlyAmorizations(loanAmount, interest, loanMonthDuration) {
    interest = monthlyInterestRateConversion(interest);

    let amorizationArray = []
    let monthlyRate = interestRateConversion(interest);
    let payment = loanAmount * (monthlyRate/(1-Math.pow(
      1+monthlyRate, -loanMonthDuration))); 
    let interestPayment = 0
    let principalPayment = 0
    let endingBalance = 0
  
    for (let i = 1; i <= loanMonthDuration; i++) {
      let monthly = {}
      monthly["month"] =  String(i);
      console.log(typeof loanAmount)
      monthly["beginning_balance"] = String(Number(loanAmount).toFixed(2));
      interestPayment = loanAmount * monthlyRate
      monthly["interest"] = String(interestPayment.toFixed(2));
      principalPayment = payment - interestPayment
      monthly["principal"] = String(principalPayment.toFixed(2));
      endingBalance = loanAmount - principalPayment
      monthly["ending_balance"] = Number(endingBalance).toFixed(2);
      loanAmount = loanAmount - principalPayment;
      amorizationArray.push(monthly);
    }
    console.log(amorizationArray);
    setAmortizationSchedule(amorizationArray);
  }
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auto Loan Calculator</Text>
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
            <Text>Results</Text>
            <Text style={{backgroundColor:"lightgrey"}}> Payment Every Month ${answer}</Text>
            <Text>Total of {loanMonthDuration} Payments  ${answer * 12}</Text>
            <Text>Total Interest ${(answer * 12) - loanAmount}</Text>
            <View>
              <Button title="View Amortization Schedule" onPress={() => calculateMonthlyAmorizations(loanAmount, monthlyInterestRate, loanMonthDuration)}/>
           </View> 
          </View> : <View>
            {console.log(amortizationSchedule)}
          </View>
        }
      </KeyboardAvoidingView>
  {/* 3 */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={amortizationSchedule}
          renderItem={renderItem}
          keyExtractor={payment => payment.month}
        />
      </SafeAreaView>
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