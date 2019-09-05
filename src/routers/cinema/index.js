export default {
  path: '/cinema',
  component: () => import('@/views/Cinema'),
  children: [{
      path: 'seatSelection/:data',
      components: {
        seatSelection: () => import('@/views/Cinema/seatSelection')
      },
      props: {
        seatSelection: true
      }
    }
  ]
}