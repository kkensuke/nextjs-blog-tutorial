import './admonitions.css'
import { FaRocket } from 'react-icons/fa';
import { PiNotePencilBold } from "react-icons/pi";
import { FaFire } from "react-icons/fa";
import { ImWarning } from "react-icons/im";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";


interface AdmonitionProps {
  title: string;
  children: any;
}


const AbstractAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Abstract';
  return (
    <div className="admonition admonition-abstract bg-red-100 text-slate-600" >
      <div className="admonition-title flex text-red-600">
        <FaRocket className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-red-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const NoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Note';
  return (
    <div className="admonition admonition-note bg-cyan-100 text-slate-600" >
      <div className="admonition-title flex text-blue-600">
        <PiNotePencilBold className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-blue-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const ImportantAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Important';
  return (
    <div className="admonition admonition-important bg-yellow-100 text-slate-600" >
      <div className="admonition-title flex text-orange-500">
        <FaFire className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-orange-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const TipAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Tip';
  return (
    <div className="admonition admonition-tip bg-green-100 text-slate-600" >
      <div className="admonition-title flex text-green-600">
        <FaRegLightbulb className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-green-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const WarningAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Warning';
  return (
    <div className="admonition admonition-warning bg-red-100 text-slate-600" >
      <div className="admonition-title flex text-red-500">
        <ImWarning className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-red-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const CommentAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Comment';
  return (
    <div className="admonition admonition-comment bg-slate-100 text-slate-600" >
      <div className="admonition-title flex text-slate-600">
        <FaRegCommentDots className='my-auto mr-2' size={'20'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-slate-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const ExampleAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Example';
  return (
    <div className="admonition admonition-example bg-purple-100 text-slate-600" >
      <div className="admonition-title flex text-purple-600">
        <AiOutlineExperiment className='my-auto mr-2' size={'22'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-purple-400"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const QuoteAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Quote';
  return (
    <div className="admonition admonition-quote bg-blue-100 italic text-slate-600" >
      <div className="admonition-title flex text-blue-600">
        <FaQuoteLeft className='my-auto mr-2' size={'18'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-blue-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const QuestionAdmonition = ({ title, children }: AdmonitionProps) => {
  title = title || 'Question';
  return (
    <div className="admonition admonition-Question bg-slate-100 text-slate-600" >
      <div className="admonition-title flex text-slate-600">
        <FaQuestion className='my-auto mr-2' size={'18'} color={''} /> {title}
      </div>
      <div className="border-t-2 border-slate-500"></div>
      <div className="admonition-content">{children}</div>
    </div>
  );
}
const SimpleAdmonition = ({ children }: AdmonitionProps) => (
  <div className="admonition admonition-simple bg-gray-200 text-slate-600" >
    <div className="admonition-content">{children}</div>
  </div>
);


const AdmonitionComponents = {
  abstract: AbstractAdmonition,
  note: NoteAdmonition,
  important: ImportantAdmonition,
  tip: TipAdmonition,
  warning: WarningAdmonition,
  comment: CommentAdmonition,
  example: ExampleAdmonition,
  quote: QuoteAdmonition,
  question: QuestionAdmonition,
  simple: SimpleAdmonition,
}

export default AdmonitionComponents;

