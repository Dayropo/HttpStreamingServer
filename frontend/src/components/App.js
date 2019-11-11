import React from 'react';
import SearchBar from './Searchbar';
import djangoAPI from '../api/djangoAPI';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await djangoAPI.get('/search_video/', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videos: response.data
        })
    };

    componentDidMount(){
        djangoAPI.get("/get_videos/").then((response)=>{
            var video = null;
            const values = queryString.parse(this.props.location.search)
            response.data.forEach(function(element) {               
                if(element.pk==values.video) {
                    video=element;                   
                }  
            });
            this.setState({
                videos: response.data,
                selectedVideo: video
            })
        })    
    }

    handleVideoSelect = (video) => {  
        this.setState({selectedVideo: video});       
        this.props.history.push("/?video="+video.pk);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui grid'>
                    <div className="ui column">
                        <div className="eleven wide row">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide row">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(App);