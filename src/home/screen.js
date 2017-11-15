/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NativeRouter, Route, Link } from 'react-router-native'

import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';

import { util } from '../util/util';

import { getBooks } from './duck';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            page:1,
            books: []
        }
        this._contentViewScroll = this._contentViewScroll.bind(this)
    }

    componentDidMount() {
        const _this = this;
        this.props.getBooks({
            key:'',
            page:this.state.page
        });
        // getBooks();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books: nextProps.books
        })
    }

    search(){
        // alert()
        this.state.page = 1; 

        this.props.getBooks({
            key:this.state.search,
            page:this.state.page
        });
    }

    _contentViewScroll(e){
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            // Console.log('上传滑动到底部事件')
            this.state.page += 1; 

            this.props.getBooks({
                key:this.state.search,
                page:this.state.page
            });
        }
    }




    render() {
        return (
            <ScrollView style={styles.scroll}
            onMomentumScrollEnd = {this._contentViewScroll}
            contentContainerStyle={styles.contentContainer}>
            <StatusBar
                backgroundColor="#1D1D1D"
                barStyle="light-content"
            />
                <View style={styles.searchBar}>
                    <Image />
                    <View style={styles.searchBox}>
                    <TextInput
                    autoCapitalize='none'
                    clearTextOnFocus={true}
                            style={styles.searchBox}
                            onChangeText={(search) => this.setState({search})}
                            value={this.state.search}
                        />
                    </View>
                    <TouchableOpacity 
                    style={styles.searchBtn}
                        onPress={this.search.bind(this)}>
                        <Image
                        />
                    </TouchableOpacity>
                </View>
                 <View style={styles.booklist}>
                    {
                        this.state.books.map((book, i) => {
                            return (
                                <View style={styles.book} key={i}>
                                    <Link to={`/image/${book.id}`}>
                                    <Image
                                        style={styles.thumb}
                                        source={{ uri: book.thumb }}
                                    />
                                    </Link>
                                    <Text style={styles.title}>{book.name}</Text>
                                </View>
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
        books: state.home.get('books').toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getBooks: bindActionCreators(getBooks, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
};

const titleConfig = {
    title: 'Hello, world',
};


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
        backgroundColor:'#EA2049'
    },

    booklist:{
        marginTop:util.scale(10),
        width:util.scale(375),
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor:'#1D1D1D',
        paddingTop:util.scale(12),
        paddingLeft:util.scale(12),
      },
    book: {
        width: util.scale(169),
        height: util.scale(276),
        marginBottom:util.scale(12),
        marginRight:util.scale(12),
        backgroundColor:'#1D1D1D',
    },
    thumb:{
        width: util.scale(169),
        height: util.scale(242),
    },
    title:{
        height:util.scale(28),
        width:util.scale(141),
        paddingTop:util.scale(3),
        paddingBottom:util.scale(3),
        paddingLeft:util.scale(3),
        paddingRight:util.scale(3),
        fontSize:util.scale(12),
        lineHeight:util.scale(12),
        color:'#FFF'
    }
});
