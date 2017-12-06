import React, { Component }from 'react';
import { View, Image, AsyncStorage } from 'react-native';


class ProfilePic extends Component{
   
    state={
        placeHolder: require('../../assets/images/perfilPlaceholder.png'),
        src: ''
    }

    componentWillMount() {
        if(this.props.data === undefined) {

            AsyncStorage.getItem('userData')
            .then(data => { 
                this.setState({ src: (JSON.parse(data)).Imagem})
            })
        }
    }

    render(){
        let base64 = 'data:image/png;base64,'

        if(this.props.data !== undefined){

            base64 += this.props.data
            return(
                <Image 
                    source={{uri: base64}} style={styles.imageStyle}
                    resizeMode="cover"  
                />
            )
        }
        else if (this.state.src !== '' && this.state.src !== null){

            base64 += this.state.src
            return(
                <Image 
                    source={{uri: base64}} style={styles.imageStyle}
                    resizeMode="cover"  
                />
            )
        }
        else {
            
            return(
                <Image 
                    source={this.state.placeHolder} style={styles.imageStyle}
                    resizeMode="cover"  
                />
            )
        }
    }
    
}

const styles = {
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
};

export default ProfilePic;
