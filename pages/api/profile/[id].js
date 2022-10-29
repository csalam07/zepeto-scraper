import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const url = `https://user.zepeto.me/${id}?language=en`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    if (!page)
      return res.status(400).json({ src: "This username doesn't exist " });
    // profile image
    const [el] = await page.$x('/html/body/div/div/div[2]/section[1]/div/img');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    // name
    const [el2] = await page.$x(
      '/html/body/div/div/div[2]/section[1]/div/div/div[1]/h2',
    );
    const title = await el2.getProperty('textContent');
    const titleTxt = await title.jsonValue();

    // location
    let locationTxt;
    const [el3] = await page.$x(
      '/html/body/div/div/div[2]/section[1]/div/div/div[2]/p[2]',
    );
    if (!el3) {
      locationTxt = 'NA';
    } else {
      const location = await el3.getProperty('textContent');
      locationTxt = await location.jsonValue();
    }

    // post
    const [el4] = await page.$x(
      '/html/body/div/div/div[2]/section[1]/div/div/ul/li[1]/span[1]/strong',
    );
    const post = await el4.getProperty('textContent');
    const postTxt = await post.jsonValue();

    // follwors
    const [el5] = await page.$x(
      '/html/body/div/div/div[2]/section[1]/div/div/ul/li[2]/span[1]/strong',
    );
    const follwors = await el5.getProperty('textContent');
    const follworsTxt = await follwors.jsonValue();

    // follwing
    const [el6] = await page.$x(
      '/html/body/div/div/div[2]/section[1]/div/div/ul/li[3]/span[1]/strong',
    );
    const follwing = await el6.getProperty('textContent');
    const follwingTxt = await follwing.jsonValue();

    // bio
    const [el7] = await page.$x('/html/body/div/div/div[2]/section[1]/p');
    const bio = await el7.getProperty('textContent');
    const bioTxt = await bio.jsonValue();

    const result = {
      srcTxt,
      titleTxt,
      bioTxt,
      postTxt,
      follwingTxt,
      follworsTxt,
      locationTxt,
    };
    // console.log(result);
    await browser.close();
    res.status(200).json({ src: result });
  }
}
