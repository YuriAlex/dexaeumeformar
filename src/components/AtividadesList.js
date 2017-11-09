import React, { Component } from 'react';
import { View, ListView, Dimensions } from 'react-native';
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

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.atividades);
    }

    renderQuestions(atividade) {
        return (<AtividadeItem atividade={atividade} />);
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

                    <ListView 
                        dataSource={this.dataSource}
                        renderRow={this.renderQuestions}
                    />
                </View>
            </SideMenu>
        );
    }
}

const mapStateToProps = state => {
    return { atividades: state.atividades };
};

export default connect(mapStateToProps)(AtividadesList);
