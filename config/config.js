export default {
    singular:true,
    plugins:[
        ['umi-plugin-react',{
            antd:true,
            dva:true
        }],
    ],
    routes: [{
        path:'/',
        component:'../layout',
        routes: [
            {
                path:'/',component: './HelloWorld'
            },
            {
                path:'/helloworld',component:'./HelloWorld'
            },
            {
                path: '/puzzlecards', component: './puzzlecards'
            },
            {
                path:'/dashboard',
                routes:[
                    {path:'/dashboard/analysis',component:'./Dashboard/Analysis'},
                    {path:'/dashboard/monitor',component:'./Dashboard/Monitor'},
                    {path:'/dashboard/workplace',component:'./Dashboard/Workplace'}
                ]
            },
            {
                path:'/list',component:'./list'
            }
        ]

    }],
    proxy:{
        '/dev':{
            target:'https://api.apiopen.top',
            changeOrigin:true,
            pathRewrite:{"^/dev":""}
        }
    }
};