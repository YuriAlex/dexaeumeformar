import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, LayoutAnimation, UIManager, Platform } from 'react-native';
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
                <Text style={{lineHeight: 25, paddingLeft: 10 }}>
                    <Text style={styles.purpleStyle}>{this.props.ordem}.</Text>
                    <ContentText text={'   ' + atividade.Pergunta} />
                </Text>
            );
        }

        return (
            <Text style={{lineHeight: 25, paddingLeft: 10 }}>
                <Text style={styles.purpleStyle}>{this.props.ordem}.</Text>
                <Text style={{ fontSize: 15, color: '#171721', flex: 1, fontWeight: 'bold' }}>
                        {'   ' + atividade.Pergunta}
                </Text>
            </Text>
        );
    }

    renderAnswer() {
        const { atividade, expanded } = this.props;

        if (expanded) {
            return (
                <View style={styles.answerStyle} >
                    <Text style={{lineHeight: 25, paddingLeft: 10 }}>
                        <Text style={styles.purpleStyle}>R.</Text>
                        <ContentText text={'   ' + atividade.Resposta} />
                    </Text>
                </View>
            );
        }
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={this.manageCurrentId.bind(this)} >
                <View>
                    <View style={styles.containerStyle} >
                        {this.renderQuestion()}
                    </View>
                    {this.renderAnswer()}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = {

    containerStyle: {
        borderTopWidth: 1,
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e7e7e7'
    },

    answerStyle: {
        padding: 15,
        paddingTop: 0,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    
    purpleStyle: {
        fontSize: 14,
        color: '#6563a4',
        fontWeight: 'bold'
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.atividadeSelectedId === ownProps.atividade.Id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(AtividadeItem);
