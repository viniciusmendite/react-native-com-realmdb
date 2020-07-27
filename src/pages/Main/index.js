import React, {useState} from 'react';
import {StatusBar, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import getRealm from '../../services/Realm';

import Repository from '../../components/Repository';

import {Container, Title, Form, Input, Submit, List} from './styles';

const Main = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const saveRepository = async (repository) => {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm(); // recebe a conexão com o bd

    // toda vez que for fazer uma alteração dento do bd, seja adição, edição ou remoção
    // de algum registro do Realm, é necessário encapsular dentro do write()
    realm.write(() => {
      // salvar dados no bd, primeiro passa o nome do schema e depois os dados
      realm.create('Repository', data);
    });
  };

  const handleAddRepository = async () => {
    try {
      const response = await api.get(`repos/${input}`);

      saveRepository(response.data);

      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Container>
        <Title>Repositórios</Title>

        <Form>
          <Input
            value={input}
            error={error}
            onChangeText={(t) => setInput(t)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Procurar repositório..."
          />

          <Submit onPress={handleAddRepository}>
            <Icon name="add" size={22} color="#fff" />
          </Submit>
        </Form>

        <List
          keyboardShouldPersistTaps="handled"
          data={[
            {
              id: 1,
              name: 'RealmDB',
              description: 'Offline First',
              stars: 134,
              forks: 1345774,
            },
          ]}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <Repository data={item} />}
        />
      </Container>
    </>
  );
};

export default Main;
