import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { HeaderRegular } from './demf';
import AtividadeItem from './demf/AtividadeItem';

const styles = {
     container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
    }
 };

class AtividadesList extends Component {
    
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.atividades);
    }

    renderQuestions(atividade) {
        return (<AtividadeItem atividade={atividade} />);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderRegular headerText='Atividades Complementares' />

                <ListView 
                    dataSource={this.dataSource}
                    renderRow={this.renderQuestions}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return { atividades: state.atividades };
};

export default connect(mapStateToProps)(AtividadesList);
