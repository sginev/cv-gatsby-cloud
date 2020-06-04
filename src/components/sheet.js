/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from 'gatsby-image';

import "./sheet.sass";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import FlagUK from '../assets/flag-uk.svg'

// Add all icons to the library so you can use it in your page
library.add(fas, far, fab)

const Spacer = () => <div className="spacer" />
const ItemSpacer = () => <div className="item-spacer" />

const ProfileImage = ({ data }) => <Img className="profile" fluid={ data.theme.profilePicture.fluid } /> 

const SidebarHeader = ({ children }) => <h2>{ children }</h2>
const SidebarListItem = node => 
  node.href ? <li className='link'><i className={ node.faIcon }></i><a href={ node.href }>{ node.label }</a></li>
            : <li><i className={ node.faIcon }></i><span>{ node.label }</span></li>

const StorySection = ({ children, title }) => (
  <div className="section">
    <h1>{ title }</h1>
    { children }
    <Spacer/>
  </div>
)

const UK = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 40" width="64" height="40">
  <defs>
      <path d="M25.85 39.95L25.85 27.88L6.74 39.69L25.85 39.95Z" id="a2frqTFOCi" />
      <path d="M0 26.17L0 36.05L17.58 26.27L0 26.17Z" id="a10fnOQc0B" />
      <path d="M26.01 0.03L26.01 12.36L6.83 0.16L26.01 0.03Z" id="ao2C22CM1" />
      <path d="M0 15L0 4.81L17.69 14.89L0 15Z" id="b4FqbyxNO" />
      <path d="M38 40.17L38 27.77L57.18 39.9L38 40.17Z" id="bjObM67Ms" />
      <path d="M64 26.09L64 36.03L46.32 26.2L64 26.09Z" id="blOYDLHbL" />
      <path d="M37.98 0.03L37.98 12.2L56.91 0.16L37.98 0.03Z" id="e1TnN3V02" />
      <path d="M64 15L64 4.81L46.31 14.89L64 15Z" id="c3Tcd9AeRh" />
      <path d="M0 18.06L64 18.06L64 22.78L0 22.78L0 18.06Z" id="d6HOqEZN3" />
      <path d="M34.6 0L34.6 40.13L29.6 40.13L29.6 0L34.6 0Z" id="a1bQTbAWug" />
  </defs>
  <g>
      <g><use xlink:href="#a2frqTFOCi" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#a10fnOQc0B" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#ao2C22CM1" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#b4FqbyxNO" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#bjObM67Ms" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#blOYDLHbL" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#e1TnN3V02" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#c3Tcd9AeRh" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#d6HOqEZN3" opacity="1" fill="#FFF" fill-opacity="1" /></g>
      <g><use xlink:href="#a1bQTbAWug" opacity="1" fill="#FFF" fill-opacity="1" /></g>
  </g>
</svg>`
        //<span dangerouslySetInnerHTML={{__html: FlagUK}} />

//const avatarSize = 160
//const avatarUrl = `https://www.gravatar.com/avatar/3f1e138aed35af0b978a9140d29bc067?s=${ avatarSize }&d=http%3A%2F%2Fcv.thechoephix.com%2Fassets%2Fimages%2FDSC00884-1.png`
//const ProfileImage = ({ data }) => <img className="profile" src={ avatarUrl } width={ avatarSize } height={ avatarSize } alt=""/> 

const ResumeSheet = ({ data }) => {
  const hightlightSkill = node => node.confidence > 3 && node.priority > 3 && node.categories.includes("web")
  const main_skills = data.skills.nodes.filter( hightlightSkill )
  const other_skills = data.skills.nodes.filter( node => ! main_skills.includes( node ) )
  return (
    <div className="sheet">
      
      <div className="top-detail" />

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
                <img className="flag" src={ FlagUK } /> 
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

      <div className="content">
        <div className="header">
          <h1 className="name">{data.general.firstName} {data.general.lastName}</h1>
          <h3 className="tagline">{data.general.professionalTitle}</h3>
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
              <ItemSpacer/>
            </div>
          }
          {
            data.projects.nodes.filter( node => node.priority > 3 ).map( ( node, i ) => (
              <div key={ node.id } className="item">
                { i > 0 && <ItemSpacer/> }
                <div className="upper-row">
                  <h3 className="job-title">{ node.title }</h3>
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
                <div className="details" dangerouslySetInnerHTML={{ __html: node.description }} />
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
    </div>
  )
}

export default ResumeSheet;
