import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const WalletScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu plano:</Text>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Free</Text>
        <Text style={styles.planDescription}>Grátis por 15 dias</Text>
        <Button title="Free" onPress={() => alert('Plano Free selecionado')} />
      </View>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Premium Mensal</Text>
        <Text style={styles.planDescription}>R$ 100 por mês</Text>
        <Button title="Premium Mensal" onPress={() => navigation.navigate('Payment', { plan: 'mensal' })} />
      </View>
      <View style={styles.planContainer}>
        <Text style={styles.planTitle}>Premium Anual</Text>
        <Text style={styles.planDescription}>R$ 50 por ano</Text>
        <Button title="Premium Anual" onPress={() => navigation.navigate('Payment', { plan: 'anual' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  planContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WalletScreen;
