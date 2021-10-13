import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark';
import html from 'remark-html'

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

const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map(fileName => ( {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }));
};

const getPostData = async id => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContent);
    /// use remark to convert markdown into html string
    const processedContent = await remark().use(html)
                                            .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}

export {
    getAllPostIds,
    getPostData,
}