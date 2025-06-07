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
const Sidebar = () => {
    return(
          <div className='sidebar'>
            <HomeButton />
            <SearchButton />
            <NotificationButton />
            <MailButton />
            <GrokButton />
            <BookmarkButton />
            <RecruitmentButton />
            <CommunityButton />
            <PremiumButton />
            <VerifiedorganizationButton />
            <ProfileButton />
            <SeemoreButton />
          </div>
    );
}

export default Sidebar;