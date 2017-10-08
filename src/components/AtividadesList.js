import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import AtividadeItem from './demf/AtividadeItem';

const teste = [
    {
        id: 0,
        pergunta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 1,
        pergunta: 'Pergunta 01',
        resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 2,
        pergunta: 'Pergunta 02',
        resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 3,
        pergunta: 'Pergunta 03',
        resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 4,
        pergunta: 'Pergunta 04',
        resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
];

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
                {/* <Header headerText='Atividades Complementares' /> */}

                {/* <ScrollView>                    
                    {this.renderQuestions()}
                </ScrollView> */}
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
