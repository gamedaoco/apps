import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';

import { baseStyles } from '../base.css';
import { formatAmount } from '../../utils/amount';

import { Amount, PoolAsset } from '@galacticcouncil/sdk';

@customElement('gc-xcm-app-chain')
export class SelectChain extends LitElement {
  @property({ attribute: false }) chains: string[] = [];
  @property({ type: String }) fromChain = null;
  @property({ type: String }) toChain = null;
  @property({ type: String }) selector = null;

  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .header {
        display: flex;
        justify-content: center;
        padding: 22px 28px;
        box-sizing: border-box;
        align-items: center;
        height: 84px;
      }

      .header span {
        color: var(--hex-neutral-gray-100);
        font-weight: 500;
        font-size: 16px;
      }

      .header .back {
        position: absolute;
        left: 20px;
      }

      .search {
        padding: 0 14px;
        box-sizing: border-box;
      }

      @media (min-width: 768px) {
        .search {
          padding: 0 28px;
        }
      }

      .loading {
        align-items: center;
        display: flex;
        padding: 8px 28px;
        gap: 6px;
        border-bottom: 1px solid var(--hex-background-gray-800);
      }

      .loading > span.title {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `,
  ];

  isDisabled(chain: string): boolean {
    return this.selector === this.fromChain && chain === this.toChain;
  }

  isSelected(chain: string): boolean {
    return this.selector == chain;
  }

  getSlot(chain: string): string {
    if (this.isDisabled(chain)) {
      return 'disabled';
    } else if (this.isSelected(chain)) {
      return 'selected';
    } else {
      return null;
    }
  }

  onBackClick(e: any) {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('back-clicked', options));
  }

  loadingTemplate() {
    return html`
      <div class="loading">
        <uigc-skeleton circle progress></uigc-skeleton>
        <span class="title">
          <uigc-skeleton progress width="40px" height="16px"></uigc-skeleton>
        </span>
      </div>
    `;
  }

  render() {
    const isDest = this.selector === this.toChain;
    return html`
      <div class="header">
        <uigc-icon-button class="back" @click=${this.onBackClick}> <uigc-icon-back></uigc-icon-back> </uigc-icon-button>
        <span>Select ${isDest ? 'destination' : 'source'} chain</span>
        <span></span>
      </div>
      ${when(
        this.chains.length > 0,
        () => html` <uigc-list>
          <span slot="header">CHAIN LIST</span>
          ${map(this.chains, (chain: string) => {
            return html`
              <uigc-list-item
                .item=${chain}
                slot=${this.getSlot(chain)}
                ?selected=${this.isSelected(chain)}
                ?disabled=${this.isDisabled(chain)}
              >
                <uigc-chain .chain=${chain}></uigc-chain>
              </uigc-list-item>
            `;
          })}
        </uigc-list>`,
        () => html`
          <uigc-list>
            <span slot="header">CHAIN LIST</span>
            ${map(range(3), (i) => this.loadingTemplate())}
          </uigc-list>
        `
      )}
    `;
  }
}
