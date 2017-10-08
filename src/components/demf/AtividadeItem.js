import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { ContentText, ClassItem } from './';

class AtividadeItem extends Component {

    componentWillMount() {
        if (Platform.OS === 'android') { 
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.linear();
    }

    renderDescription() {
        const { atividade, expanded } = this.props;

        if (expanded) {
            return (
                <ContentText text={atividade.resposta} />
            );
        }
    }

    render() {
        const { id, pergunta } = this.props.atividade;
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectAtividade(id)} >
                <View style={styles.containerStyle} >
                    <Text style={styles.numberStyle}>{id}.</Text>
                    <ContentText text={pergunta} />
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
};

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50'
    },
    numberStyle: {
        fontSize: 14,
        color: '#6563a4',
        fontWeight: 'bold',
        paddingRight: 20,
        paddingLeft: 10
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.ativSelection === ownProps.atividade.id;
    console.log(state);

    return { expanded };
};

export default connect(mapStateToProps, actions)(AtividadeItem);
