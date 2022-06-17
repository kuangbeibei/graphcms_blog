import { FC, useState, useEffect, Fragment } from "react";
import { Post, ContentObj, ContentTypeObj } from "types";

const getContentFragment = (index: string | number, text: any, obj: any, type?: string) => {
    let modifiedText: any = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item: any, i: number) => <Fragment key={i}>{item}</Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item: any, i: number) => <Fragment key={i}>{item}</Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item: any, i: number) => <Fragment key={i}>{item}</Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

const PostDetail: FC<{post: Post}> = ({post}) => {
    return <div className="bg-white shadow-lg rounded-lg pb-12 mb-8 lg:p-8">
        <div className="overflow-hidden relative shadow-md mb-8">
            <img src={
                post.featuredImage.url
            } alt={post.title} className="w-full h-full object-top rounded-t-lg" />
        </div>
        <h1 className="w-full px-10 font-semibold text-3xl mb-4">{post.title}</h1>
        <div className="w-full px-10 mx-auto text-gray-600 font-medium text-sm">
            {
                post.content.raw.children.map((typeObj: ContentTypeObj, index: number) => {
                    const children = typeObj.children.map((item: ContentObj, itemIndex: number) => getContentFragment(itemIndex, item.text, item));

                    return getContentFragment(index, children, typeObj, typeObj.type)
                })
            }
        </div>
        
    </div>
};

export default PostDetail;