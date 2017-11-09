import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { HeaderRegular, Obrigatorias, Eletivas, Optativas, DrawerContent } from './demf';

const FirstRoute = () => <Obrigatorias url='http://104.41.36.75:3070/disciplina/curso/f7c44ded-9fc7-604b-94db-6d72446a10bb'/>;
const SecondRoute = () => <Eletivas url='http://104.41.36.75:3070/disciplina/curso/eletivas/f7c44ded-9fc7-604b-94db-6d72446a10bb'/>;
const ThirdRoute = () => <Optativas url='http://104.41.36.75:3070/disciplina/curso/optativas/f7c44ded-9fc7-604b-94db-6d72446a10bb'/>;

class Matriz extends Component {

    state = {
        index: 0,
        routes: [
          { key: '1', title: 'OBRIGATORIAS' },
          { key: '2', title: 'ELETIVAS' },
          { key: '3', title: 'OPTATIVAS' }
        ],

        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })}
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width });
        // if(this.props.startingTab !== undefined)
        //     index: this.props.startingTab
    };

    componentDidMount() {
        console.log(this.state);
    };

    mudarState = index => this.setState({ index });

    renderizarHeader = props => {
        console.log(this.state);
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
        '1': FirstRoute,
        '2': SecondRoute,
        '3': ThirdRoute,
    });

    render() {

        const { toggle, screenWidth, menuState, isOpen } = this.state;

        return (
            <SideMenu
                menu={<DrawerContent closeDrawer={toggle.bind(this)} />}
                isOpen={isOpen}
                onChange={(isOpen) => menuState}
                openMenuOffset={screenWidth}
                disableGestures={true}
            >
                <View style={styles.container}>
                    <HeaderRegular iconPress={toggle.bind(this)} headerText='Matriz Curricular' />
                    <TabViewAnimated
                        navigationState={this.state}
                        renderScene={this.renderizarCena}
                        renderHeader={this.renderizarHeader}
                        onIndexChange={this.mudarState}
                    />
                </View>
            </SideMenu>
            
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
