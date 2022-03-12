import { request, gql, GraphQLClient } from 'graphql-request'
import { useState, useEffect } from 'react'
import './Event.css';
import EventCard from './EventCard';
// import {query1} from '../services/Graphcms.jsx'


function Events() {

    const [cmsData, setcmsData] = useState(null)

    useEffect(() => {
        getData();
    }, [])



    function getData() {
        console.log("Button Clicked")
        const url =
            'https://api-ap-south-1.graphcms.com/v2/cl0cf5lw20flf01wbb6fy1opm/master'
        const graphQLClient = new GraphQLClient(url, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDY0MDI2NTEsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDBjZjVsdzIwZmxmMDF3YmI2Znkxb3BtL21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjM0MGZlNzYzLWQxYmQtNGNiZC05MTY1LTAwNjBkYzk4NWY2MCIsImp0aSI6ImNsMGNobW53eDByajAwMXhyN2tjaDJiYTMifQ.yOGz49TO3U0IRm0jPx_MeISD7tnqktQQaIDj8fzu3sw0i0rtGNfvV0hgP_RdQklJjfrfhfUVnoo1w_CQXEijz5GwLAwzPa7lchd3AI2v3N3RKL6dLVfgGxJ_ilKS6SvvcF3f5la1Z_4AqP5UyzgSwXZDgZufpiXDdGTmTQp0tt7Cp7YPAudmYHIVdlsp96zaC136HzguuR-eMd_HM4eoumPO0h9_Z4PBmVxKPOUUtcdVr2r2Y83KPkn0YleRtuyuF7bd28saoFkazsggC6mHiBvpYwRpprJTwpFJ1v2evRkkJY_r1rOJ0c9QIn6e8-LWi06OoFDq6E2mTcoBDdzfXzmkhNh2CuRAztl0m-faBK9H4SOVIXB6DYPQ4YWaqU0n60NzgKcAzG2b3ybhz_kyA6z22ySZ1-iadUwck7PDp0KR69AraWoTvjDbl2khD4L43TSdGztMilGMzc_2ZxNCp-HOKX4PR65zWGAwTgvByMPJ6Hbk5mPigFVFjHO1dxiuiHgmxA2O5Qi00Fu_g_hL2RfPDEGWpfAiCJIDybHQUbZi0G_xvcZkoad98IzzIP8IanAz6lGpASMxYwLYBK0qwcVbfEBC9frRGOSOYYBdf9gSs2Cjg3m2dr1dgZaYWfb3Ytr9uvRN3IFofFAdpCeUlPGUq_1B2iHCf8G7p7mW5ZM',
            },
        })

   
        const query = gql`
        query MyQuery {
            eventPages {
              eventTitle
              eventDescription
              id
              topicsClearedTitle
              topicsClearedDescription
              topicsClearedImage {
                url
              }
              eventCoverPhoto {
                url
              }
              eventDateTime
              slug
              eventCategory
              eventSummary
            }
          }
        `

        const data = graphQLClient.request(query).then((dd) => {
            console.log(dd.eventPages[0].eventCoverPhoto.url);
            setcmsData(dd.eventPages)
        })
    }

    return ( 
    <div className = "App" >

    <section className="landing-event-m">
        <div className="intro" data-aos="fade-up">
            <h1>Events</h1>
            <p>We collaborate with university students through student clubs to grow developer communities.<br></br>
                <strong>Innovo Infinity</strong> supports and recognizes students, but does not own or manage them.<br></br><br></br>    1. We provide opportunities to enhance their technical knowledge.<br></br> 2. Gain industrial experience
                by solving problems using technology.</p>
        </div>
    </section>

    <section className="past-web" id="web">
      <div className="do-heading">Recent Events</div>
      <div className="do-cards">
      {/* ------------------MAP FUNCTION ---------------------------------------- */}

      {cmsData && cmsData.map((post,i)=>{
        console.log(post);
        if(post.eventCategory == "RecentEvent"){
        return <>
        
       <EventCard title={post.eventTitle} description={post.eventSummary} coverPhoto={post.eventCoverPhoto.url} slug={post.slug} />
       </>
        }
      })}

      </div>
      
    </section>

    <section className="past-web" id="web">
      <div className="do-heading">Past Webinar</div>
      <div className="do-cards">
      {/* ------------------MAP FUNCTION ---------------------------------------- */}

      {cmsData && cmsData.map((post,i)=>{
        console.log(post);
        if(post.eventCategory == "PastWebinar"){
        return <>
        
       <EventCard title={post.eventTitle} description={post.eventSummary} coverPhoto={post.eventCoverPhoto.url} slug={post.slug} />
       </>
        }
      })}

      </div>
      
    </section>     
    <section className="past-web" id="web">
      <div className="do-heading">Past Coding Contest</div>
      <div className="do-cards">
      {/* ------------------MAP FUNCTION ---------------------------------------- */}

      {cmsData && cmsData.map((post,i)=>{
        console.log(post);
        if(post.eventCategory == "PastCodingContest"){
        return <>
        
       <EventCard title={post.eventTitle} description={post.eventDescription} coverPhoto={post.eventCoverPhoto.url} slug={post.slug} />
       </>
        }
      })}

      </div>
      
    </section>     
    <section className="past-web" id="web">
      <div className="do-heading">Past Tech Talks</div>
      <div className="do-cards">
      {/* ------------------MAP FUNCTION ---------------------------------------- */}

      {cmsData && cmsData.map((post,i)=>{
        console.log(post);
        if(post.eventCategory == "PastTechTalk"){
        return <>
        
       <EventCard title={post.eventTitle} description={post.eventDescription} coverPhoto={post.eventCoverPhoto.url} slug={post.slug} />
       </>
        }
      })}

      </div>
      
    </section>     
        
    
    {/* //</br> <button onClick={()=>getData()}>Get Data Button</button> */}
  </div>
)
}
    export default Events