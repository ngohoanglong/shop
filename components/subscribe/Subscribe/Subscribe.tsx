import { Title } from '@components/common'
import { Button, Input } from '@components/ui'
import React from 'react'
const Subscribe: React.FC = () => (
  <div
    className="py-6 lg:py-12 flex flex-col md:flex-row"
    data-testid="Subscribe"
  >
    <div>
      <Title small>Our Newsletter</Title>
    </div>
    <div className="w-0 h-6 md:w-10"></div>
    <div className="flex-1 flex justify-end pb-3">
      <Input
        type="email"
        placeholder="Your email address"
        className="w-full max-w-md"
      ></Input>
      <Button variant="slim">Subscribe</Button>
    </div>
  </div>
)
export default Subscribe
