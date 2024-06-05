import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native';

const Plan = ({ title, description, onSelect, expanded, onToggle }) => {
  const [animation] = useState(new Animated.Value(expanded ? 1 : 0));

  const toggleDescription = () => {
    const initialValue = expanded ? 1 : 0;
    const finalValue = expanded ? 0 : 1;

    onToggle();
    animation.setValue(initialValue);
    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const descriptionHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Ajuste a altura conforme necessário
  });

  return (
    <View style={styles.planContainer}>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.planTitle}>{title}</Text>
        <Animated.View style={{ height: descriptionHeight, overflow: 'hidden' }}>
          <Text style={styles.planDescription}>{description}</Text>
        </Animated.View>
      </TouchableOpacity>
      <Button title={title} onPress={onSelect} />
    </View>
  );
};

const WalletScreen = ({ navigation }) => {
  const [expandedPlan, setExpandedPlan] = useState(null);

  const handleToggle = (plan) => {
    setExpandedPlan(expandedPlan === plan ? null : plan);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu plano:</Text>
      <Plan
        title="Free"
        description="Grátis por 15 dias"
        onSelect={() => alert('Plano Free selecionado')}
        expanded={expandedPlan === 'Free'}
        onToggle={() => handleToggle('Free')}
      />
      <Plan
        title="Premium Mensal"
        description="R$ 100 por mês. Benefícios: Acesso ilimitado, Suporte prioritário."
        onSelect={() => navigation.navigate('Payment', { plan: 'Premium Mensal', price: 10000 })}
        expanded={expandedPlan === 'Premium Mensal'}
        onToggle={() => handleToggle('Premium Mensal')}
      />
      <Plan
        title="Premium Anual"
        description="R$ 50 por ano. Benefícios: Acesso ilimitado, Suporte prioritário, Descontos exclusivos."
        onSelect={() => navigation.navigate('Payment', { plan: 'Premium Anual', price: 5000 })}
        expanded={expandedPlan === 'Premium Anual'}
        onToggle={() => handleToggle('Premium Anual')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  planContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  planDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
});

export default WalletScreen;
