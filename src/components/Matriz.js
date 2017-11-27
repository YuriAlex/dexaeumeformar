import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { HeaderRegular, Obrigatorias, Eletivas, Optativas, DrawerContent } from './demf';

class Matriz extends Component {

    state = {
        index: 0,
        routes: [
            { key: '1', title: 'OBRIGATÓRIAS' },
            { key: '2', title: 'ELETIVAS' },
            { key: '3', title: 'OPTATIVAS' }
        ],

        obrigatorias: {},
        eletivas: {},
        optativas: {},

        firstRoute: () => <Obrigatorias disciplinas={this.state.obrigatorias}/>,
        secondRoute: () => <Eletivas disciplinas={this.state.eletivas}/>,
        thirdRoute: () => <Optativas disciplinas={this.state.optativas}/>,

        ready: false,

        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })}
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width });
        // if(this.props.startingTab !== undefined)
        //     index: this.props.startingTab
    
        AsyncStorage.getItem('disciplinas')
        .then(data => {

            let ob = [];
            let el = [];
            let op = [];
            console.log("a");
            JSON.parse(data).map(item =>{
                if(item.Tipo === 1)
                    ob.push(item)
                else if(item.Tipo === 2)
                    el.push(item)
                else if(item.Tipo === 3)
                    op.push(item)
            })
            console.log('asdasd')

            this.setState({ obrigatorias: ob });
            this.setState({ eletivas: el });
            this.setState({ optativas: op });

            this.setState({ ready:  true });

            console.log(this.state);
        })
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
        '1': this.state.firstRoute,
        '2': this.state.secondRoute,
        '3': this.state.thirdRoute
    });

    renderTabView () {
        if(this.state.ready) {
            return (
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this.renderizarCena}
                    renderHeader={this.renderizarHeader}
                    onIndexChange={this.mudarState}
                />
            )
        }
    }

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
                    {this.renderTabView()}
                </View>
            </SideMenu>
            
        );
    }
}

const styles = {
    container: {
       flexDirection: 'column',
       height: '100%',
       backgroundColor: '#fff'
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
