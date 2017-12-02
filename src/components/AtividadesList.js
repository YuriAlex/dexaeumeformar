import React, { Component } from 'react';
import { View, ListView, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { HeaderRegular, DrawerContent } from './demf';
import AtividadeItem from './demf/AtividadeItem';

const styles = {
     container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
 };

class AtividadesList extends Component {
    
    state = {
        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })}
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width });

        AsyncStorage.getItem('faq')
        .then(data => {
            let f = JSON.parse(data);
            this.setState({ faq: f });
        })
    }

    renderList () {
        if (this.state.faq === undefined)
            return;
        
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        let dataSource = ds.cloneWithRows(this.state.faq);

        return (
            <ListView 
                dataSource={dataSource}
                renderRow={this.renderQuestions}
                renderRow={(rowData, sectionID, rowID, higlightRow) => this.renderQuestions(rowData, rowID)}
            />
        )
    }

    renderQuestions(atividade, ordem) {
        return (<AtividadeItem atividade={atividade} ordem={Number(ordem) + 1}/>);
    }
    
    render() {
        console.log(this.state);
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
                    <HeaderRegular iconPress={toggle.bind(this)} headerText='Atividades Complementares' />
                    {this.renderList()}
                </View>
            </SideMenu>
        );
    }
}

export default AtividadesList;
