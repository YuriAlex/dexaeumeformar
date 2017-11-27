import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, UIManager, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { ContentText } from './';

class AtividadeItem extends Component {

    componentWillMount() {
        if (Platform.OS === 'android') { 
                UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.linear();
    }

    manageCurrentId() {
        if (this.props.expanded) {
            this.props.selectAtividade(-1);
        } else {
            this.props.selectAtividade(this.props.atividade.Id);
        }
    }

    renderQuestion() {
        const { atividade, expanded } = this.props;

        if (!expanded) {
            return (
                <ContentText text={atividade.Pergunta} />
            );
        }

        return (
            <Text style={{ fontSize: 15, color: '#171721', flex: 1, fontWeight: 'bold' }}>
                    {atividade.Pergunta}
            </Text>
        );
    }

    renderAnswer() {
        const { atividade, expanded } = this.props;

        if (expanded) {
            return (
                <View style={styles.containerStyle} >
                <Text style={styles.purpleStyle}>R.</Text>
                <ContentText text={atividade.Resposta} />
            </View>
            );
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.manageCurrentId.bind(this)} >
                <View>
                    <View style={styles.containerStyle} >
                        <Text style={styles.purpleStyle}>{this.props.ordem}.</Text>
                        {this.renderQuestion()}
                    </View>
                    {this.renderAnswer()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50'
    },
    purpleStyle: {
        fontSize: 14,
        color: '#6563a4',
        fontWeight: 'bold',
        paddingRight: 20,
        paddingLeft: 10
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.atividadeSelectedId === ownProps.atividade.Id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(AtividadeItem);
