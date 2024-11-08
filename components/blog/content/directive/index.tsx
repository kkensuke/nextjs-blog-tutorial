import { visit } from 'unist-util-visit';
import { h } from 'hastscript';
import { YouTubeEmbed } from './client';

// Define directive handlers for different types of text directives
const directiveHandlers = {
  // Inline directives (single colon)
  textDirective: {
    youtube: (node: any) => {
      // Inline YouTube is always a link, never an embed
      const videoId = node.attributes?.id || '';
      const title = node.children[0]?.value || '';
      return h('youtube-embed', { 
        videoId,
        title,
        embed: 'false'
      });
    }
  },
  
  // Block directives (double colon)
  leafDirective: {
    youtube: (node: any) => {
      // Block YouTube is always an embed
      const videoId = node.attributes?.id || '';
      const title = node.children[0]?.value || '';
      return h('youtube-embed', { 
        videoId,
        title,
        embed: 'true'
      });
    }
  }
};

export function remarkTextDirectives() {
  return (tree: any) => {
    visit(tree, (node) => {
      // Handle different directive types
      if (node.type === 'textDirective' || node.type === 'leafDirective') {
        const handlers = directiveHandlers[node.type as 'textDirective' | 'leafDirective'];
        const handler = handlers?.[node.name as keyof typeof handlers];
        
        if (handler) {
          const result = handler(node);
          node.data = node.data || {};
          node.data.hName = result.tagName;
          node.data.hProperties = result.properties;
        }
      }
    });
  };
}

export const TextDirectiveComponents = {
  'youtube-embed': ({ 
    videoId, 
    title, 
    embed
  }: { 
    videoId: string; 
    title: string;
    embed: string;
  }) => {
    return (
      <YouTubeEmbed 
        videoId={videoId} 
        title={title}
        embed={embed === 'true'}
      />
    );
  },
  // Add more text directive components here...
};