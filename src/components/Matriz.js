import React, { Component } from 'react';
import { View } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { HeaderRegular, Obrigatorias, Eletivas, Optativas } from './demf';

const FirstRoute = () => <Obrigatorias />;
const SecondRoute = () => <Eletivas />;
const ThirdRoute = () => <Optativas />;

class Matriz extends Component {

    state = {
        index: 0,
        routes: [
          { key: '1', title: 'OBRIGATÓRIAS' },
          { key: '2', title: 'ELETIVAS' },
          { key: '3', title: 'LIVRES' },
        ],
    };

    mudarState = index => this.setState({ index });

    renderizarHeader = props => {
        return (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
          />
        );
    };

    renderizarCena = SceneMap({
        1: FirstRoute,
        2: SecondRoute,
        3: ThirdRoute,
    });

    render() {
        return (
            <View style={styles.container}>
                <HeaderRegular headerText='Matriz Curricular' />

                <TabViewAnimated
                navigationState={this.state}
                renderScene={this.renderizarCena}
                renderHeader={this.renderizarHeader}
                onIndexChange={this.mudarState}
                />
            </View>
            
        );
    }
}

const styles = {
    container: {
       flexDirection: 'column',
       height: '100%',
       justifyContent: 'space-between',
   },
   tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#05b9c4',
  },
  label: {
    color: '#171721',
    fontSize: 12
  },
};

export default Matriz;
