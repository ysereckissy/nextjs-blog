import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContent);
        
        return {
            id,
            ...matterResult.data
        }
    });
    return allPostsData.sort(({ date: a }, {date: b }) => {
        let retVal = 0;
        if(a === b) return 0;
        retVal = (a < b) ? 1 : -1;
        return retVal;
    })
}