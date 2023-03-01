import React from 'react';
import ContentLoader from "react-content-loader";

const Loader: React.FC = () => (
   <ContentLoader
      speed={2}
      width={300}
      height={460}
      viewBox="0 0 300 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <rect x="30" y="275" rx="3" ry="3" width="240" height="26" />
      <rect x="0" y="320" rx="6" ry="6" width="300" height="75" />
      <rect x="0" y="415" rx="6" ry="6" width="104" height="32" />
      <rect x="140" y="415" rx="10" ry="10" width="160" height="50" />
      <circle cx="150" cy="135" r="120" />
   </ContentLoader>
)

export default Loader;