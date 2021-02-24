let ids = [];
for(let startDaysAgo = 900; startDaysAgo > 30; startDaysAgo -= 7) {
  try {
    let result = await fetch(`https://api.pushshift.io/reddit/search/submission/?subreddit=videos&after=${Math.round((Date.now()/1000)-60*60*24*startDaysAgo)}&before=${Math.round((Date.now()/1000)-60*60*24*(startDaysAgo-7))}&sort_type=score&fields=url&limit=100`).then(r => r.json());
    for(let post of result.data) {
      if(post.url.startsWith("https://www.youtube.com/watch?v=")) ids.push(post.url.split("?v=")[1].split("&")[0]);
      else if(post.url.startsWith("https://youtu.be/")) ids.push(post.url.split("/").pop());
    }
    console.log("startDaysAgo:", startDaysAgo);
    console.log("ids.length:", ids.length);
    await new Promise(r => setTimeout(r, 1500));
  } catch(e) {
    console.error(e);
    await new Promise(r => setTimeout(r, 10000));
  }
}
console.log(ids);
console.log("Run JSON.stringify(ids) to get the JSON text.");
