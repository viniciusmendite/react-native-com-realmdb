import React from 'react';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Repository from '../../components/Repository';

import {Container, Title, Form, Input, Submit, List} from './styles';

const Main = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Container>
        <Title>Repositórios</Title>

        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Procurar repositório..."
          />

          <Submit onPress={() => {}}>
            <Icon name="add" size={22} color="#fff" />
          </Submit>
        </Form>

        <List
          keyboardShouldPersistTaps="handle"
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
