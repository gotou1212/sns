import './Sidebar.css'
import { HomeButton } from './HomeButton';
import { SearchButton } from './SearchButton';
import { NotificationButton } from './NotificationButton';
import { MailButton } from './MailButton';
import { GrokButton } from './GrokButton';
import { BookmarkButton } from './BookmarkButton';
import { RecruitmentButton } from './RecruitmentButton';
import { CommunityButton } from './CommunityButton';
import { PremiumButton } from './PremiumButton';
import { VerifiedorganizationButton } from './VerifiedorganizationButton';
import { ProfileButton } from './ProfileButton';
import { SeemoreButton } from './SeemoreButton';


const SidebarHeader = () => {
  return (
    <div className='sidebar-header'>
      <div>LOGO</div>
      </div>
  )
}

const SidebarMenu = () => {
  return (
    <div className='sidebar-menu'>
      <div className='sidebar-menu-item1'>
        <HomeButton />
        <div>Home</div>
      </div>
      <div className='sidebar-menu-item2'>
        <SearchButton />
        <div>Search</div>
      </div>
      <div className='sidebar-menu-item3'>
        <NotificationButton />
        <div>Notification</div>
      </div>
      <div className='sidebar-menu-item4'>
        <MailButton />
        <div>Mail</div>
        </div>     
      <div className='sidebar-menu-item5'>
         <GrokButton />
         <div>Grok</div>
      </div>
      <div className='sidebar-menu-item6'>
         <BookmarkButton />
         <div>Bookmark</div>
      </div>
      <div className='sidebar-menu-item7'>
         <RecruitmentButton />
         <div>Recruitment</div>
      </div>
      <div className='sidebar-menu-item8'>
           <CommunityButton />
           <div>Community</div>
      </div>
      <div className='sidebar-menu-item9'>
          <PremiumButton />
          <div>Premium</div>
      </div>
      <div className='sidebar-menu-item10'>
          <VerifiedorganizationButton />
          <div>Verifiedorganization</div>
      </div>
      <div className="profile">
        <div className='sidebar-menu-item11'>
          <ProfileButton />
          <div>Profile</div>
        </div>
        <div className='sidebar-menu-item12'>
          <SeemoreButton /> 
          <div>Seemore</div>
          </div>    
      </div>
    </div>
  )
} 
const Sidebar = () => {
    return(
          <div className='sidebar'>
             <SidebarHeader />
             <SidebarMenu/>             
          <div className='sidebar-post-button'>
            ポストする
          </div>

          <a href="/login">LOGIN</a>
          </div>
    );
}

export default Sidebar;