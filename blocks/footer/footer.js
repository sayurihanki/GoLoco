import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const section = footer.querySelector('.section');
  const wrapper = section.querySelector('.default-content-wrapper');
  
  // Select all direct children of the wrapper except the first one
  const childElements = Array.from(wrapper.children).slice(1);
  const newListDiv = document.createElement('div');
  newListDiv.classList.add('list');

  childElements.forEach((el) => { newListDiv.appendChild(el) });
  wrapper.insertBefore(newListDiv, wrapper.children[1])

  block.append(footer);
}
