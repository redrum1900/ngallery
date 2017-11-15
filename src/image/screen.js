/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NativeRouter, Route, Link } from 'react-router-native'

import NavigationBar from 'react-native-navbar';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import { util } from '../util/util';

import { getImages } from './duck';

class ImageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        
    }

    componentDidMount() {
        const _this = this;
        this.props.getImages(this.props.match.params.id);
        // getBooks();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images
        })
    }




    render() {
        return (
            <ScrollView style={styles.scroll}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.searchBar}>
                <Link to="/">
                    <Text>返回</Text>
                </Link>
            </View>
                 <View style={styles.imgs}>
                    {
                        this.state.images.map((img, i) => {
                            return (
                                    <Image key={i}
                                        style={styles.page}
                                        source={{ uri: img.url }}
                                    />
                            )
                        })
                    }
                 </View>

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        images: state.images.get('images').toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getImages: bindActionCreators(getImages, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageScreen);




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
 
    scroll: {
        // marginTop:util.scale(64),
          // 背景色
          height:util.height,
          backgroundColor:'#0F0F0F',
          // 上边距
    },
    contentContainer:{
        alignItems:'center'
    },

    searchBar:{
        flexDirection: 'row',
        height:util.scale(50),
        width:util.scale(375),
        backgroundColor:'#1D1D1D',
        marginTop:util.scale(20),
        alignItems:'center'


    },

    searchBox:{
        width:util.scale(251),
        height:util.scale(40),
        backgroundColor:'#FFF'
    },
    searchBtn:{
        width:util.scale(40),
        height:util.scale(40),
        backgroundColor:'#EA2049',
        color:'#FFF'
    },

    imgs:{
        width:util.scale(375),
        flexDirection: 'column',
        backgroundColor:'#1D1D1D',
      },
    page: {
        width: util.scale(375),
        height:util.scale(537)
    },


});
