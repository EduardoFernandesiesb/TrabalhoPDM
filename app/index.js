import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { labels } from '../components/labels';

export default function App() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const adicionarUsuario = () => {
    if (nome.trim() !== '' && telefone.trim() !== '') {
      setUsuarios([...usuarios, { nome, telefone }]);
      setNome('');
      setTelefone('');
    }
  };

  const removerUsuario = (index) => {
    const novaLista = usuarios.filter((_, i) => i !== index);
    setUsuarios(novaLista);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>Agenda Telefônica{'\n'}by Eduardo Fernandes</Text>

      <Text style={styles.label}>{labels.nome}</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>{labels.telefone}</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o telefone"
        placeholderTextColor="#aaa"
        value={telefone}
        onChangeText={(text) => setTelefone(text.replace(/[^0-9]/g, ''))}
        keyboardType="phone-pad"
      />

      <View style={styles.buttonWrapper}>
        <Button title="Adicionar" color="#00cc99" onPress={adicionarUsuario} />
      </View>

      <ScrollView style={styles.lista}>
        {usuarios.map((usuario, index) => (
          <View key={index} style={styles.usuario}>
            <Text style={styles.usuarioTexto}>
              {usuario.nome} - {usuario.telefone}
            </Text>
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerUsuario(index)}
            >
              <Text style={styles.removerTexto}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#1e1e1e',
  },
  buttonWrapper: {
    marginTop: 15,
    marginBottom: 20,
  },
  lista: {
    flex: 1,
  },
  usuario: {
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  usuarioTexto: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  botaoRemover: {
    backgroundColor: '#ff4444',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removerTexto: {
    color: '#fff',
    fontSize: 14,
  },
});
