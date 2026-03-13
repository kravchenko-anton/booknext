import { useTypedNavigation } from '@/hooks'
import { Settings as SettingsIcon } from '@/icons'
import { useStatisticsWithSync } from '@/screens/profile/useStatisticsWithSync'
import { useAuthStore } from '@/store/auth/auth-store'
import { Loader, ScrollLayout, Title } from '@/ui'
import * as Header from '@/ui/header/header'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { userLanguage } from '@/utils/constants/user-language'
import dayjs from 'dayjs'
import { RefreshControl, View } from 'react-native'

const Profile = () => {
  const { navigate } = useTypedNavigation();
  const {isLoading,refetch,syncHistory, statistic} = useStatisticsWithSync();
  const {user} = useAuthStore()
  const userCreatedAt = user?.createdAt || null;
  console.log(userCreatedAt)
  const lastMonthDatesArray = Array.from({ length: dayjs().daysInMonth() }, (_, index) => {
    const currentDate = dayjs().date(index + 1);
    const date = currentDate.format('DD');
    const number = currentDate.format('D');
    const totalReadingTime = statistic?.find(stat => dayjs(stat.date).format('DD') === date)?.totalReadingTime;
    const isDateOfJoin = userCreatedAt ? currentDate.isSame(dayjs(userCreatedAt), 'day') : false;
    const isBeforeToday = currentDate.isBefore(dayjs(), 'day');
    const isBeforeJoinDate = userCreatedAt ? currentDate.isBefore(dayjs(userCreatedAt), 'day') : false;
    const isCurrentDay = currentDate.isSame(dayjs(), 'day');
    return { date, isCurrentDay, isBeforeToday, totalReadingTime,number,isDateOfJoin,  isBeforeJoinDate
    };
  });
  console.log(userLanguage)
  return (
    <>
      <Header.Head>
        <Header.HeaderTitle title='Profile' />
        <Header.Icon
          className="pr-2"
          icon={SettingsIcon}
          onPress={() => navigate("Settings")}
        />
    
      </Header.Head>
      {
        isLoading ? <Loader /> :
      <ScrollLayout
        className=''
        refreshControl={
          <RefreshControl
            refreshing={false}
            colors={[Color.white]}
            progressBackgroundColor={Color.transparent}
            onRefresh={() => {
              syncHistory(true);
              refetch();
            }}
          />
        }
      >
        
        <View className='rounded-xl mx-2 mt-4 bg-foreground p-2 pb-6'>
         <View className='flex-row justify-between items-center px-2'>
           <Title className="mb-2" color={Color.white} weight='bold' size='xxxl'>
             Statistic
           </Title>
           <View>
             <Title color={Color.white} weight='light' size='xl'>
                {dayjs().format('MMMM')}  
             </Title>
             
           </View>
         </View>
          <View className='flex gap-2 flex-wrap flex-row justify-center'>
        {
          lastMonthDatesArray.map((date) =>  (
              <View key={date.date}
                className={cn('border-2 justify-center items-center border-bordered w-[14%] h-[55px]  rounded-md', {
                  'bg-primary border-0': date.totalReadingTime,
                  "bg-[#8E4A49] border-0": !date.totalReadingTime && date.isBeforeToday,
                  "bg-bordered border-0":  date.isCurrentDay ,
                  "bg-transparent border-2": date.isBeforeJoinDate,
                  "bg-[#5D5D81] border-0": date.isDateOfJoin
              })}>
                <Title key={date.number} size='xl' className="text-center mb-1">
                  {date.number}
                </Title>
                <Title key={date.totalReadingTime} color={Color.gray} size='ssm' className="text-center absolute bottom-1">
                  {date.totalReadingTime}
                </Title>
              </View>
            ))
        }
          </View>
        </View>
      </ScrollLayout>
      }
    </>
  );
};

export default Profile;
