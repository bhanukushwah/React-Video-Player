import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
import _ from 'lodash';
import FooterApp from './components/footer'

const API_KEY = 'Enter Your API KEY here';

class App extends Component {
    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        }
        this.videoSearch('Arijit Singh');
    } 
    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) =>{
            this.setState({ 
                videos:videos,
                selectedVideo: videos[0]
             });
        });
    }

    render () {
        const  videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetails video = {this.state.selectedVideo}/>
                <VideoList 
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}/>
                <FooterApp />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));