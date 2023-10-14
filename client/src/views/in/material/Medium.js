import React from 'react'

// B03
// 許秉鈞 2019 Fall CS M.S. 經驗分享（上篇：經驗傳承）,  2019 Fall CS M.S. 經驗分享（下篇：顛覆印象）
// 許凱傑 EE Ph.D. Application https://medium.com/phd-in-america/introduction-b80879fe10e6
// 卓伯鴻 M.S. ECE/CS Applications https://jaycho2007.medium.com/m-s-ece-cs-applications-776098fca74e, 2021 SWE New Grad 找工雜談  https://jaycho2007.medium.com/2021-swe-new-grad-%E6%89%BE%E5%B7%A5%E9%9B%9C%E8%AB%87-816ce8b93677
// 楊其昇 北美硬體 VLSI 找實習/正職心得 https://chisheny.medium.com/%E5%8C%97%E7%BE%8E%E7%A1%AC%E9%AB%94-vlsi-%E6%89%BE%E5%AF%A6%E7%BF%92-%E6%AD%A3%E8%81%B7%E5%BF%83%E5%BE%97-1960e0d2ed7a, UM ECE MS 兩年修課心得  https://chisheny.medium.com/um-ece-ms-%E5%85%A9%E5%B9%B4%E4%BF%AE%E8%AA%B2%E5%BF%83%E5%BE%97-f3e6e61a9a42
// 孫凡耕 申請美國EE/CS PhD經驗分享(1)-總結、感想 https://medium.com/@sunfankeng/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8Bee-cs-phd%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E7%B8%BD%E7%B5%90-%E6%84%9F%E6%83%B3-%E6%84%9F%E8%AC%9D-959b8eccc3f0
// 張博智 走點彎路的碩士申請（一）：背景、動機 https://primesnow.medium.com/%E8%B5%B0%E9%BB%9E%E5%BD%8E%E8%B7%AF%E7%9A%84%E7%A2%A9%E5%A3%AB%E7%94%B3%E8%AB%8B-%E4%B8%80-%E8%83%8C%E6%99%AF-%E5%8B%95%E6%A9%9F-2260c537b520

// B04
// 莫絲羽 CMU Robotics MS 申請美國機器人相關碩士經驗分享 https://medium.com/momo%E7%9A%84%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%95%99%E5%AD%B8%E5%A4%A2/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8B%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%9B%B8%E9%97%9C%E7%A2%A9%E5%A3%AB%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-d85a519b1974
// 吳倉永 2020 Fall 申請美國硬體 MS/MEng  https://tywu13.medium.com/2020-fall-%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94-ms-meng-4fee92a73bec, 2020 COVID19 北美找工作心得分享 https://tywu13.medium.com/2020-covid19-%E5%8C%97%E7%BE%8E%E6%89%BE%E5%B7%A5%E4%BD%9C%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-685731a4cda, 美國硬體工程師必勝面經   https://tywu13.medium.com/%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94%E5%B7%A5%E7%A8%8B%E5%B8%AB%E5%BF%85%E5%8B%9D%E9%9D%A2%E7%B6%93-c1a7423a9498

// B05
// 許秉倫 Open Source 開源社群的第一門課 | 如何成為 Apache Committer https://byronhsu1230.medium.com/open-source-%E9%96%8B%E6%BA%90%E7%A4%BE%E7%BE%A4%E7%9A%84%E7%AC%AC%E4%B8%80%E9%96%80%E8%AA%B2-%E5%A6%82%E4%BD%95%E6%88%90%E7%82%BA-apache-committer-451d42e853d6

// B06
// MikeWang 2022 Fall US CS Master 申請心得 https://medium.com/@mike_tcwang/2022-fall-us-cs-master-%E7%94%B3%E8%AB%8B%E5%BF%83%E5%BE%97-b0f9ccb23196?mibextid=Zxz2cZ

const Medium = () => {
  // const mediums = [
  //   [
  //     {
  //       name:"許秉鈞",
  //       materials:[
  //         {title:"2019 Fall CS M.S. 經驗分享（上篇：經驗傳承）",link:"https://medium.com/@adrianhsu/2019-fall-cs-m-s-%E7%94%B3%E8%AB%8B%E5%9B%9E%E9%A5%8B-59d9b728d990"},
  //         {title:"2019 Fall CS M.S. 經驗分享（下篇：顛覆印象）",link:"https://medium.com/@adrianhsu/2019-fall-cs-m-s-%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E4%B8%8B%E7%AF%87-aabe034053c9"},
  //       ]
  //     },
  //     {
  //       name: "許凱傑",
  //       materials:[
  //         {title:"EE Ph.D. Application",link:"https://medium.com/phd-in-america/introduction-b80879fe10e6"},
  //       ]
  //     },
  //     {
  //       name: "卓伯鴻",
  //       materials:[
  //         {title:"M.S. ECE/CS Applications",link:"https://jaycho2007.medium.com/m-s-ece-cs-applications-776098fca74e"},
  //         {title:"2021 SWE New Grad 找工雜談",link:"https://jaycho2007.medium.com/2021-swe-new-grad-%E6%89%BE%E5%B7%A5%E9%9B%9C%E8%AB%87-816ce8b93677"},
  //       ]
  //     },
  //     {
  //       name:"楊其昇",
  //       materials:[
  //         {title:"北美硬體 VLSI 找實習/正職心得",link:"https://chisheny.medium.com/%E5%8C%97%E7%BE%8E%E7%A1%AC%E9%AB%94-vlsi-%E6%89%BE%E5%AF%A6%E7%BF%92-%E6%AD%A3%E8%81%B7%E5%BF%83%E5%BE%97-1960e0d2ed7a"},
  //         {title:"UM ECE MS 兩年修課心得",link:"https://chisheny.medium.com/um-ece-ms-%E5%85%A9%E5%B9%B4%E4%BF%AE%E8%AA%B2%E5%BF%83%E5%BE%97-f3e6e61a9a42"},
  //       ]
  //     },
  //     {
  //       name:"孫凡耕",
  //       materials:[
  //         {title:"申請美國EE/CS PhD經驗分享(1)-總結、感想",link:"https://medium.com/@sunfankeng/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8Bee-cs-phd%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E7%B8%BD%E7%B5%90-%E6%84%9F%E6%83%B3-%E6%84%9F%E8%AC%9D-959b8eccc3f0"},
  //       ]
  //     },
  //     {
  //       name:"張博智",
  //       materials:[
  //         {title:"走點彎路的碩士申請（一）：背景、動機",link:"https://primesnow.medium.com/%E8%B5%B0%E9%BB%9E%E5%BD%8E%E8%B7%AF%E7%9A%84%E7%A2%A9%E5%A3%AB%E7%94%B3%E8%AB%8B-%E4%B8%80-%E8%83%8C%E6%99%AF-%E5%8B%95%E6%A9%9F-2260c537b520"},
  //       ]
  //     },
  //     {
  //       name:"莫絲羽",
  //       materials:[
  //         {title:"CMU Robotics MS 申請美國機器人相關碩士經驗分享",link:"https://medium.com/momo%E7%9A%84%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%95%99%E5%AD%B8%E5%A4%A2/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8Bee-cs-phd%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E7%B8%BD%E7%B5%90-%E6%84%9F%E6%83%B3-%E6%84%9F%E8%AC%9D-959b8eccc3f0"},
  //       ]
  //     },
  //     {
  //       name:"吳倉永",
  //       materials:[
  //         {title:"2020 Fall 申請美國硬體 MS/MEng",link:"https://tywu13.medium.com/2020-fall-%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94-ms-meng-4fee92a73bec"},
  //         {title:"2020 COVID19 北美找工作心得分享",link:"https://tywu13.medium.com/2020-covid19-%E5%8C%97%E7%BE%8E%E6%89%BE%E5%B7%A5%E4%BD%9C%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-685731a4cda"},
  //         {title:"美國硬體工程師必勝面經",link:"https://tywu13.medium.com/%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94%E5%B7%A5%E7%A8%8B%E5%B8%AB%E5%BF%85%E5%8B%9D%E9%9D%A2%E7%B6%93-c1a7423a9498"},
  //       ]
  //     },
  //     {
  //       name:"許秉倫",
  //       materials:[
  //         {title:"開源社群的第一門課 | 如何成為 Apache Committer",link:"https://byronhsu1230.medium.com/open-source-%E9%96%8B%E6%BA%90%E7%A4%BE%E7%BE%A4%E7%9A%84%E7%AC%AC%E4%B8%80%E9%96%80%E8%AA%B2-%E5%A6%82%E4%BD%95%E6%88%90%E7%82%BA-apache-committer-451d42e853d6"},
  //       ]
  //     },
  //     {
  //       name:"MikeWang",
  //       materials:[
  //         {title:"2022 Fall US CS Master 申請心得",link:"https://medium.com/@mike_tcwang/2022-fall-us-cs-master-%E7%94%B3%E8%AB%8B%E5%BF%83%E5%BE%97-b0f9ccb23196?mibextid=Zxz2cZ"},
  //       ]
  //     }
  //   ]
  // ]
  const mediums = {
    B03: [
      {
        name: '許秉鈞',
        materials: [
          {
            title: '2019 Fall CS M.S. 經驗分享（上篇：經驗傳承）',
            link: 'https://medium.com/@adrianhsu/2019-fall-cs-m-s-%E7%94%B3%E8%AB%8B%E5%9B%9E%E9%A5%8B-59d9b728d990',
          },
          {
            title: '2019 Fall CS M.S. 經驗分享（下篇：顛覆印象）',
            link: 'https://medium.com/@adrianhsu/2019-fall-cs-m-s-%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E4%B8%8B%E7%AF%87-aabe034053c9',
          },
        ],
      },
      {
        name: '許凱傑',
        materials: [
          {
            title: 'EE Ph.D. Application',
            link: 'https://medium.com/phd-in-america/introduction-b80879fe10e6',
          },
        ],
      },
      {
        name: '卓伯鴻',
        materials: [
          {
            title: 'M.S. ECE/CS Applications',
            link: 'https://jaycho2007.medium.com/m-s-ece-cs-applications-776098fca74e',
          },
          {
            title: '2021 SWE New Grad 找工雜談',
            link: 'https://jaycho2007.medium.com/2021-swe-new-grad-%E6%89%BE%E5%B7%A5%E9%9B%9C%E8%AB%87-816ce8b93677',
          },
        ],
      },
      {
        name: '楊其昇',
        materials: [
          {
            title: '北美硬體 VLSI 找實習/正職心得',
            link: 'https://chisheny.medium.com/%E5%8C%97%E7%BE%8E%E7%A1%AC%E9%AB%94-vlsi-%E6%89%BE%E5%AF%A6%E7%BF%92-%E6%AD%A3%E8%81%B7%E5%BF%83%E5%BE%97-1960e0d2ed7a',
          },
          {
            title: 'UM ECE MS 兩年修課心得',
            link: 'https://chisheny.medium.com/um-ece-ms-%E5%85%A9%E5%B9%B4%E4%BF%AE%E8%AA%B2%E5%BF%83%E5%BE%97-f3e6e61a9a42',
          },
        ],
      },
      {
        name: '孫凡耕',
        materials: [
          {
            title: '申請美國EE/CS PhD經驗分享(1)-總結、感想',
            link: 'https://medium.com/@sunfankeng/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8Bee-cs-phd%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E7%B8%BD%E7%B5%90-%E6%84%9F%E6%83%B3-%E6%84%9F%E8%AC%9D-959b8eccc3f0',
          },
        ],
      },
      {
        name: '張博智',
        materials: [
          {
            title: '走點彎路的碩士申請（一）：背景、動機',
            link: 'https://primesnow.medium.com/%E8%B5%B0%E9%BB%9E%E5%BD%8E%E8%B7%AF%E7%9A%84%E7%A2%A9%E5%A3%AB%E7%94%B3%E8%AB%8B-%E4%B8%80-%E8%83%8C%E6%99%AF-%E5%8B%95%E6%A9%9F-2260c537b520',
          },
        ],
      },
    ],
    B04: [
      {
        name: '莫絲羽',
        materials: [
          {
            title: 'CMU Robotics MS 申請美國機器人相關碩士經驗分享',
            link: 'https://medium.com/momo%E7%9A%84%E6%A9%9F%E5%99%A8%E4%BA%BA%E7%95%99%E5%AD%B8%E5%A4%A2/%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8Bee-cs-phd%E7%B6%93%E9%A9%97%E5%88%86%E4%BA%AB-%E7%B8%BD%E7%B5%90-%E6%84%9F%E6%83%B3-%E6%84%9F%E8%AC%9D-959b8eccc3f0',
          },
        ],
      },
      {
        name: '吳倉永',
        materials: [
          {
            title: '2020 Fall 申請美國硬體 MS/MEng',
            link: 'https://tywu13.medium.com/2020-fall-%E7%94%B3%E8%AB%8B%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94-ms-meng-4fee92a73bec',
          },
          {
            title: '2020 COVID19 北美找工作心得分享',
            link: 'https://tywu13.medium.com/2020-covid19-%E5%8C%97%E7%BE%8E%E6%89%BE%E5%B7%A5%E4%BD%9C%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-685731a4cda',
          },
          {
            title: '美國硬體工程師必勝面經',
            link: 'https://tywu13.medium.com/%E7%BE%8E%E5%9C%8B%E7%A1%AC%E9%AB%94%E5%B7%A5%E7%A8%8B%E5%B8%AB%E5%BF%85%E5%8B%9D%E9%9D%A2%E7%B6%93-c1a7423a9498',
          },
        ],
      },
    ],
    B05: [
      {
        name: '許秉倫',
        materials: [
          {
            title: '開源社群的第一門課 | 如何成為 Apache Committer',
            link: 'https://byronhsu1230.medium.com/open-source-%E9%96%8B%E6%BA%90%E7%A4%BE%E7%BE%A4%E7%9A%84%E7%AC%AC%E4%B8%80%E9%96%80%E8%AA%B2-%E5%A6%82%E4%BD%95%E6%88%90%E7%82%BA-apache-committer-451d42e853d6',
          },
        ],
      },
    ],
    B06: [
      {
        name: 'MikeWang',
        materials: [
          {
            title: '2022 Fall US CS Master 申請心得',
            link: 'https://medium.com/@mike_tcwang/2022-fall-us-cs-master-%E7%94%B3%E8%AB%8B%E5%BF%83%E5%BE%97-b0f9ccb23196?mibextid=Zxz2cZ',
          },
        ],
      },
    ],
  }
  return (
    <div>
      <h1>Mediums</h1>
      {mediums.map((medium, index) => (
        <div key={index}>
          <h2>{medium.name}</h2>
          <ul>
            {medium.materials.map((material, index) => (
              <li key={index}>
                <a href={material.link}>{material.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Medium
