import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import api from "../../services/api";
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author
} from "./styles.js";

export default class User extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dangerouslyGetState: PropTypes.func,
    }).isRequired
  }

  state = {
    stars: [],
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { user } = navigation.dangerouslyGetState("User").routes[1].params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
    })
  }

  render() {
    const { stars } = this.state;
    const { navigation } = this.props;
    const { user } = navigation.dangerouslyGetState("User").routes[1].params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    )
  }
}