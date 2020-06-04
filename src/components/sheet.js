/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import Img from 'gatsby-image';
import FlagUK from './flag-uk'

import "./sheet.sass";
import "./sheet-animations.sass";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

const Spacer = () => <div className="spacer" />
const ItemSpacer = () => <div className="item-spacer" />
const ProfileImage = ({ data }) => <Img className="profile" fluid={ data.theme.profilePicture.fluid } /> 
const SidebarHeader = ({ children }) => <h2>{ children }</h2>
const SidebarListItem = node => 
  node.href ? <li className='link' title={ node.note }>
                <i className={ node.faIcon }></i>
                <a href={ node.href } target={node.href.startsWith('http')?"_blank":"_self"}>{ node.label }</a>
              </li>
            : <li><i className={ node.faIcon }></i><span>{ node.label }</span></li>
const StorySection = ({ children, title }) => (
  <div className="section">
    <h1>{ title }</h1>
    { children }
    <Spacer/>
  </div>
)

//const avatarSize = 160
//const avatarUrl = `https://www.gravatar.com/avatar/3f1e138aed35af0b978a9140d29bc067?s=${ avatarSize }&d=http%3A%2F%2Fcv.thechoephix.com%2Fassets%2Fimages%2FDSC00884-1.png`
//const ProfileImage = ({ data }) => <img className="profile" src={ avatarUrl } width={ avatarSize } height={ avatarSize } alt=""/> 

const ResumeSheet = ({ data }) => {
  const [ selectedProject, selectProject ] = useState( null )
  console.log( selectProject )

  const hightlightSkill = node => node.confidence > 3 && node.priority > 3 && node.categories.includes("web")
  const main_skills = data.skills.nodes.filter( hightlightSkill )
  const other_skills = data.skills.nodes.filter( node => ! main_skills.includes( node ) )
  return (
    <div className="sheet">
      
      <div className="top-detail" />

      

      <div className="content">
        <div className="header">
          <div>
            <h1 className="name">{data.general.firstName} {data.general.lastName}</h1>
            <h3 className="job">{data.general.professionalTitle}</h3>
          </div>
        </div>
        <div className="story">
          
          <StorySection title="Career Profile">
            <div className="item">
              <div className="text" dangerouslySetInnerHTML={{ __html: data.general.introduction }} />
            </div>
          </StorySection>
          
          <StorySection title="Projects">
          {
            data.general.projectsPrologue && false &&
            <div className="item">
              <div className="text" dangerouslySetInnerHTML={{ __html: data.general.projectsPrologue }} />
            </div>
          }
          {
            data.projects.nodes.filter( node => node.priority > 3 ).map( ( node, i ) => (
              <div key={ node.id } className="item" /*onClick={ () => selectProject( node.id ) }*/ >
                <ItemSpacer/>
                <div className="upper-row">
                  <h3 className="title">{ node.title }</h3>
                </div>
                <div className="details" active={ selectedProject === node.id ? '' : null } >
                  { node.links.map( link => <a key={ link.id } href={ link.url } target="_blank" rel="noreferrer">Link to: { link.label }</a> ) }
                  { node.links.length ? <p>-</p> : null }
                </div>
                <div className="project-tagline" dangerouslySetInnerHTML={{ __html: node.summary }}>
                </div>
              </div>
            ) )
          }
          </StorySection>
          
          <StorySection title="Experiences">
          {
            data.experiences.nodes.map( ( node, i ) => (
              <div key={ node.id } className="item">
                <ItemSpacer/>
                <div className="xp-header">
                  <div className="logo"><Img className="logo" fluid={ node.logo.fluid } width={200}/></div>
                  <h3 className="company">{ node.title }</h3>
                  <div className="job-title">{ node.jobTitle }</div>
                  <div className="time">({ node.dates })</div>
                </div>
                <div className="description" dangerouslySetInnerHTML={{ __html: node.description }} />
                <ItemSpacer/>
              </div>
            ) )
          }
          </StorySection>
          
          <StorySection title="Miscellaneous">
            <div className="item">
              <div className="text" dangerouslySetInnerHTML={{ __html: data.general.miscellaneous }} />
            </div>
          </StorySection>
          
          <Spacer/>
          <Spacer/>
          <Spacer/>

        </div>
      </div>

      <div className="sidebar">
        <ProfileImage data={ data } />
        <div className="groups-wrapper">
          <div className="group contact-details">
            <ul>
              { data.contactDetails.nodes.filter( node => node.visible ).map( node => <SidebarListItem key={ node.id } {...node} /> ) }
            </ul>
          </div>
          <div className="group languages">
            <SidebarHeader>Languages</SidebarHeader>
            <ul>
              <li className="link"> 
                <span className="flag" dangerouslySetInnerHTML={{__html: FlagUK}} />
                <span dangerouslySetInnerHTML={{ __html: data.general.languages }} /> 
              </li>
            </ul>
          </div>
            
          <div className="group skills main">
            <SidebarHeader>Main Skills</SidebarHeader>
            <ul>
              { main_skills.map( node => <SidebarListItem key={ node.id } {...node} /> ) }
            </ul>
          </div>
            
          <div className="group skills other">
            <SidebarHeader>Other Skills</SidebarHeader>
            <ul>
              { other_skills.map( node => <SidebarListItem key={ node.id } {...node} /> ) }
            </ul>
          </div>

          { data.theme.showEducation &&  
            <div className="group education">
              <SidebarHeader>Education</SidebarHeader>
              <div dangerouslySetInnerHTML={{ __html: data.general.education }} />
            </div>
          }

        </div>
      </div>

    </div>
  )
}

export default ResumeSheet;
