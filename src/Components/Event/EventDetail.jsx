import React from 'react'
import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import './EventDetail.css';
import { request, gql, GraphQLClient } from 'graphql-request'
import ReactMarkdown from 'react-markdown'
import MDEditor from '@uiw/react-md-editor';

const EventDetail = () => {
    const params = useParams();
    const [cmsData, setcmsData] = useState(null);
    useEffect(() => {
        getData();
    }, [])
    
    function getData() {
        const query = gql`
        query MyQuery($slug: String!) {
            eventPage(where: {slug: $slug}) {
              eventTitle
              eventDescription
              id
              topicsClearedImage {
                url
              }
              eventCoverPhoto {
                url
              }
              topicsClearedDescription
              topicsClearedTitle
              eventDateTime
              youtubeLink
              eventTime
            }
        }
        `;

        const variables = { slug: `${params.slug}` };

        console.log("Button Clicked")
        const url =
        'https://api-ap-south-1.graphcms.com/v2/cl0cf5lw20flf01wbb6fy1opm/master'
        const graphQLClient = new GraphQLClient(url, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDY0MDI2NTEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDBjZjVsdzIwZmxmMDF3YmI2Znkxb3BtL21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjM0MGZlNzYzLWQxYmQtNGNiZC05MTY1LTAwNjBkYzk4NWY2MCIsImp0aSI6ImNsMGNobW53eDByajAwMXhyN2tjaDJiYTMifQ.yOGz49TO3U0IRm0jPx_MeISD7tnqktQQaIDj8fzu3sw0i0rtGNfvV0hgP_RdQklJjfrfhfUVnoo1w_CQXEijz5GwLAwzPa7lchd3AI2v3N3RKL6dLVfgGxJ_ilKS6SvvcF3f5la1Z_4AqP5UyzgSwXZDgZufpiXDdGTmTQp0tt7Cp7YPAudmYHIVdlsp96zaC136HzguuR-eMd_HM4eoumPO0h9_Z4PBmVxKPOUUtcdVr2r2Y83KPkn0YleRtuyuF7bd28saoFkazsggC6mHiBvpYwRpprJTwpFJ1v2evRkkJY_r1rOJ0c9QIn6e8-LWi06OoFDq6E2mTcoBDdzfXzmkhNh2CuRAztl0m-faBK9H4SOVIXB6DYPQ4YWaqU0n60NzgKcAzG2b3ybhz_kyA6z22ySZ1-iadUwck7PDp0KR69AraWoTvjDbl2khD4L43TSdGztMilGMzc_2ZxNCp-HOKX4PR65zWGAwTgvByMPJ6Hbk5mPigFVFjHO1dxiuiHgmxA2O5Qi00Fu_g_hL2RfPDEGWpfAiCJIDybHQUbZi0G_xvcZkoad98IzzIP8IanAz6lGpASMxYwLYBK0qwcVbfEBC9frRGOSOYYBdf9gSs2Cjg3m2dr1dgZaYWfb3Ytr9uvRN3IFofFAdpCeUlPGUq_1B2iHCf8G7p7mW5ZM',
                "content-type": "application/json",
            },
            body: JSON.stringify({ query, variables }),
        })
   

        const data = graphQLClient.request(query).then((dd) => {
            console.log(dd.eventPage);
            setcmsData(dd.eventPage);
        })
    }
    
  return (
    <>
        <section  className="landing-event" 
        style={ {backgroundImage: `url(${cmsData && cmsData.eventCoverPhoto.url})`,
        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain'
    }}
         >
             

            <div  className="landing-intro">
                <p>"Creative minds think alike"</p>
                <h1>Innovo Infinity </h1>
            </div>
        </section>

        <section  className="event-details">
        <div  className="event-info">
            <h1  className="event-name">
                {cmsData && cmsData.eventTitle}
                </h1>
             <br />   <br />
            <h2  className="event-type">About</h2>
            <p  className="event-para">
                {cmsData && cmsData.eventDescription}
            </p>
        </div>

        <div  className="event-topic">
            {cmsData && cmsData.topicsClearedTitle &&<>
            <h1  className="topic-name">
                {cmsData && cmsData.topicsClearedTitle} <br />  <br /> 
            </h1>
             
            <img 
            style={{ width: '64%',height: '500px', marginLeft: 'auto', display: 'block', marginRight: 'auto'}} 
            src={cmsData && cmsData.topicsClearedImage.url} alt="" />
             <MDEditor.Markdown className='topic-para' source={cmsData && cmsData.topicsClearedDescription} />
            </>
            }

                {cmsData  && cmsData.youtubeLink && <><h1 className="topic-name">Watch Now</h1> <br /> <iframe width="100%" height="450px" src={ cmsData&& cmsData.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></>}
        </div>


        <div  className="event-when">
            <div  className="date-time">
                <div  className="date">
                    <h1  className="name">
                        Last Date
                    </h1>
                    <h2  className="event-data">
                        {cmsData && cmsData.eventDateTime.substr(8,2) + cmsData.eventDateTime.substr(4,3) + "-" +cmsData.eventDateTime.substr(0,4)}
                    </h2>
                </div>
                <div  className="time">
                    <h1  className="name">
                        Time
                    </h1>
                    <h2  className="event-data">
                        {cmsData && cmsData.eventTime}
                    </h2>
                </div>
            </div>
            <div  className="responsive-date-time">
                <h1  className="name">
                    Date & Time
                </h1>
                <h2  className="event-data">
                    18th October 2020 &emsp;at&emsp; 04 : 00 PM
                </h2>
            </div>
            <div  className="border-line"></div>
            <div>
                <h1  className="reg">
                    Become a member of Innovo Infinity to attend this and future webinars.
                </h1>
                <a  className="event-reg" href="https://bit.ly/3itTKO8">Register Now</a>
            </div>
        </div>
    </section>
    </>
  )
  
}

export default EventDetail