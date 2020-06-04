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

const StoryHeading = ({ children }) => <h1>{ children }</h1>

const Spacer = () => <div className="spacer" />
const ItemSpacer = () => <div className="item-spacer" />

const ProfileImage = ({ data }) => <Img className="profile" fluid={ data.theme.profilePicture.fluid } /> 

const SidebarHeader = ({ children }) => <h2>{ children }</h2>
const ContactDetailsItem = node => <li key={ node.id }><i className={ node.faIcon }></i><a href={ node.href }>{ node.label }</a></li>

//const avatarSize = 160
//const avatarUrl = `https://www.gravatar.com/avatar/3f1e138aed35af0b978a9140d29bc067?s=${ avatarSize }&d=http%3A%2F%2Fcv.thechoephix.com%2Fassets%2Fimages%2FDSC00884-1.png`
//const ProfileImage = ({ data }) => <img className="profile" src={ avatarUrl } width={ avatarSize } height={ avatarSize } alt=""/> 

const ResumeSheet = ({ data }) => {
  console.log( 9999, FlagUK )
  return (
    <div className="sheet">

      <div className="sidebar">
        <ProfileImage data={ data } />
        <div className="groups-wrapper">
          <div className="group contact-details">
            <ul>
              { data.contactDetails.nodes.map( node => <ContactDetailsItem {...node} /> ) }
            </ul>
          </div>
          <div className="group languages">
            <SidebarHeader>Languages</SidebarHeader>
            <div dangerouslySetInnerHTML={{ __html: data.general.languages }} />
          </div>
          <div className="group skills">
            <SidebarHeader>Skills</SidebarHeader>
            <ul>
              { data.general.skillsList.split('\n').map( skill => <li key={ skill }>{ skill }</li> ) }
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
          
          <StoryHeading> Career Profile </StoryHeading>
          <div className="item">
            <div className="text" dangerouslySetInnerHTML={{ __html: data.general.introduction }} />
          </div>

          <Spacer/>
          
          <StoryHeading> Projects </StoryHeading>
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

          <Spacer/>

          <StoryHeading> Experiences </StoryHeading>
          {
            data.experiences.nodes.map( ( node, i ) => (
              <div key={ node.id } className="item">
                { i > 0 && <ItemSpacer/> }
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">{ node.title }</h3>
                    <div className="time">{ node.dates }</div>
                  </div>
                  <div className="company">{ node.jobTitle }</div>
                </div>
                <div className="details" dangerouslySetInnerHTML={{ __html: node.description }}>
                </div>
              </div>
            ) )
          }

          <Spacer/>
          
          <StoryHeading> Miscellaneous </StoryHeading>
          <div className="item">
            <div className="text" dangerouslySetInnerHTML={{ __html: data.general.miscellaneous }} />
          </div>

          <Spacer/>

          <Spacer/>

          <Spacer/>

          <Spacer/>

        </div>
      </div>
    </div>
  )
}

export default ResumeSheet;
