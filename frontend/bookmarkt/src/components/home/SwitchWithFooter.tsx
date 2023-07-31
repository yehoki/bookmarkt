'use client';

import Link from 'next/link';
import HomeBox from '../HomeBox';
import { AiFillGithub } from 'react-icons/ai';
import FooterGithubLink from '../FooterGithubLink';

const SwitchWithFooter = () => {
  return (
    <div className="w-[300px] hidden navOne:block">
      <HomeBox heading="News & Interviews" bottomBorder>
        <div></div>
      </HomeBox>
      <HomeBox heading="Recommendations" bottomBorder>
        <div></div>
      </HomeBox>
      <HomeBox heading="Improve Recommendations" bottomBorder>
        <div></div>
      </HomeBox>
      {/* FOOTER */}
      <HomeBox heading="">
        <FooterGithubLink />
      </HomeBox>
    </div>
  );
};

export default SwitchWithFooter;
